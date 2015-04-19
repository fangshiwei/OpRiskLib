var Movie = require("../../model/model.js");
var Comment = require("../../model/comment.js");
var lE = function(err){
    if(err){
        console.log(err);
    };
};

module.exports.index =  function(req, res) {
    console.log(req.session);
    Movie.fetch(function(err,movies) {
        res.render('index', {
            title: 'index',
            movies : movies
        });
    });
};


module.exports.movie = function(req, res, next) {
    var id = req.params.id;
    var movies = Movie.findById(id,function(err, movie) {
        if(err){
            console.log(err)
        }else{
            res.render("detail", {
                title : "movie",
                movie : movie
            });
            console.log(movie)
        };
    });
};

module.exports.list = function(req, res, next) {
    Movie.find(function(err,movies) {
        if(err) {
            console.log(err)
        }else{
            res.render("list", {
                title : "movie",
                items : movies
            });
        };
    });
};

module.exports.comment = function(req, res) {
    var body = req.body;
    if(body.movie_id) {
        Comment.findByMovieId( body.movie_id , function(err, result) {
            if(err) {
                console.log(err);
            };
            //没有这条电影的信息我们就新建一条该电影的单元数据, 成功的时候再添加用户的评论数据;
            if( result == null) {
                (new Comment({
                    movie_id : body.movie_id
                })).save(function(err){
                    if(err)console.log(err);
                    Comment.findByMovieId( body.movie_id, function(err,_result) {
                        if(err) {
                            console.log(err);
                        };
                        Fn(_result,res);
                    });

                });
            }else{
                Fn(result,res);
            };
        });
    };

    function Fn(result, res) {
        console.log(req.body)
        result.replys.push({
            from : req.body.user_id,
            to : req.body.to_id || null,
            content : req.body.content
        });
        result.save();
        res.end('{"status":"done"}');
    };
};

module.exports.getComments = function(req, res) {
    if(req.body&&req.body.movie_id){
        Comment.findByMovieIdExec( req.body.movie_id)
        .populate("replys.from replys.to","name")
        .exec( function(err,result) {
            if(err) {
                console.log(err);
            };
            res.end( JSON.stringify(result) || null );
        });
    };
};