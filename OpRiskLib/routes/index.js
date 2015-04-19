var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var dburl = require("../config").db;
mongoose.connect(dburl);

var signController = require("../controller/signController");
var roleControler = require("../controller/roleController");

module.exports = function( app ) {
    app.use(function(req, res, next) {
        if( req.session.user ) {
            app.locals.user = req.session.user;
        }else{
        };
        next();
    });
    /* GET home page. */
    router.get("/", signController.signin);
    

    //后台管理页
    //router.get("/admin/admin", roleControler.admin ,adminMovieManage.manage)
    //
    router.get("/signin",signController.signin);

    router.post("/signin",signController.signinPost);

    router.get("/signout",function(req,res,next) {
        delete req.session.user;
        delete app.locals.user;
        next();
    }, signController.signOut);

    router.get("/signup", signController.signup);
    router.post("/signup", signController.signupPost);

    app.use(router); //把所有的路由作为app的中间件;
};