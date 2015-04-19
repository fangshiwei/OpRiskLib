var Movie = require("../../model/model.js");
var Category = require("../../model/category.js");

module.exports.add = function(req, res) {
    res.render("add", {
        flash : "",
        poster : "",
        id : "",
        title : "",
        doctor : "",
        country : "",
        language : "",
        brief : "",
        types : ["默认","搞笑","坑爹","呵呵"]
    });
};

module.exports.updatemovie = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        movie.types = ["默认","搞笑","坑爹","呵呵"];
        res.render("add", movie);
    });
};

module.exports.new = function(req, res) {
    console.log("posting to url:>> /admin/movie/new")
    var postBody = req.body;
    var id = postBody["movie[id]"];
    console.log(postBody);
    if( id!=="" ) {
        console.log("id!==null, we will change the info of data");
        Movie.findById(id, function(err, data) {
            if(err)
                console.log(err);
            else{
                data.flash = postBody["movie[flash]"] || 'http://player.youku.com/embed/XODgzODQ5MTcy',
                data.poster = postBody["movie[poster]"] || "/images/logo_small.gif",
                data.type = postBody["movie[type]"];
                data.title = postBody["movie[title]"];
                data.doctor = postBody["movie[doctor]"];
                data.country = postBody["movie[country"];
                data.language = postBody["movie[language]"];
                data.brief = postBody["movie[brief]"];
                //findById返回的data默认有一个save方法;
                data.save(function(err, movie) {
                    if(err)
                        console.log(err);
                    Category.findByType(data.type,function(err, result){
                        if(err) console.log(err);
                        if(result == null){
                            (new Category({type : data.type})).save(function(){
                                Category.findByType(data.type,function(err, _result){
                                    console.log("看看在不在category里面, 要保证在这个类别里面movie的唯一性");
                                    console.log( _result.movies.indexOf(movie._id) );
                                    if(_result.movies.indexOf(movie._id) == -1 ) {
                                        _result.movies.push(movie._id)
                                        _result.save();
                                    };
                                    res.redirect("/movie/"+movie._id);
                                });
                            });
                        }else{
                            Category.findByType(data.type,function(err, _result){
                                console.log("看看在不在category里面, 要保证在这个类别里面movie的唯一性");
                                console.log( _result.movies.indexOf(movie._id) );
                                if(_result.movies.indexOf(movie._id) == -1 ) {
                                    _result.movies.push(movie._id)
                                    _result.save();
                                };
                                res.redirect("/movie/"+movie._id);
                            });
                        };
                    });
                });
            }
        });
    }else{
        var movie = new Movie({
            //给个默认值;
            flash : postBody["movie[flash]"] || 'http://player.youku.com/embed/XODgzODQ5MTcy',
            poster : postBody["movie[poster]"] || "/images/logo_small.gif",
            type : postBody["movie[type]"],
            title : postBody["movie[title]"],
            doctor : postBody["movie[doctor]"],
            country : postBody["movie[country]"],
            language : postBody["movie[language]"],
            brief : postBody["movie[brief]"],
            meta : {
                createAt : Date.now()
            }
        });
        movie.save(function(err, _movie) {
            if(err)console.log(err);

            res.redirect("/movie/"+ _movie._id)
        });
    }
};

module.exports.removemovie = function(req,res) {
    //这个param可以获取在url的query的参数, 也可以获取:id方式匹配的参数,也能获取在POST请求中body中的数据;
    var id = req.param("movie_id");
    console.log("the id is "+id+" will deleted")
    if( id!=="" ) {
        console.log("id!==null, we will change the info of data");
        Movie.findById(id, function(err, data) {
            if(err)
                console.log(err);
            else{
                Movie.findOneAndRemove({_id : id}, function() {
                    console.log("remove —— success")
                    res.end('{"status":"ok"}');
                });
            };
        })
    };
};