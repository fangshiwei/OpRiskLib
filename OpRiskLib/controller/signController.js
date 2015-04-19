var User = require("../model/OplibUser.js");
var lE = function(err){
    if(err){
        console.log(err);
    };
};

module.exports.signin = function(req, res) {
    res.render("signin",{title : "!!Login!!"});
};

module.exports.signinPost = function(req, res) {
    if( req.body.name && req.body.password) {
        User.findByName( req.body.name, function(err,result) {
            lE( err );
            if( result.password === req.body.password ) {
                req.session.user = result;
                res.redirect("/")
            };
        });
    };
};

module.exports.signOut = function(req, res, next) {
    res.redirect("/")
    next();
};

module.exports.signup = function(req, res) {
    res.render("signup",{title:"Singup"});
};

module.exports.signupPost = function(req, res) {
    if( req.body.name && req.body.password) {
        User.findByNames( req.body.name, function(err,result) {
            if( result.length ) {
                res.end("user name has repeat  ","utf8");
            }else{
                var newUser =new User({
                    name : req.body.name,
                    password : req.body.password
                });
                newUser.save(function(err, result) {
                    if(err)
                        console.log(err);
                    req.session.user = result;
                    res.end("user account created success","utf8");
                })
            }
        });
    };
};