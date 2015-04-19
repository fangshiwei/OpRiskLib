//这个router直接看成是app就好了;
var express = require('express');
var router = express.Router();
//引用mongoose模块;
var mongoose = require("mongoose");
var dburl = require("../config").db;
//var Movie = require("../model/model.js");
mongoose.connect(dburl);

//mongose的api ==》》 http://mongoosejs.com/docs/api.html
var movieRoute = require("../controller/movie-controller/movie-controller");
var adminMovieRoute = require("../controller/admin-movie-controller/admin-movie-controller");
var signController = require("../controller/sign-controller/sign-controller");
var roleControler = require("../controller/roleController");
var adminMovieManage = require("../controller/admin-manage/admin-manage");
module.exports = function( app ) {
    app.use(function(req, res, next) {
        if( req.session.user ) {
            app.locals.user = req.session.user;
        }else{
        };
        next();
    });
    /* GET home page. */
    router.get('/',movieRoute.index );

    router.get("/movie/:id",movieRoute.movie);
    //POST提交评论的接口;
    router.post("/movie/comment",movieRoute.comment);
    //POST获取评论的接口
    router.post("/movie/getcomments",movieRoute.getComments);
    router.get("/list", movieRoute.list);


    router.get("/admin/movie/add", roleControler.admin ,adminMovieRoute.add);

    router.get("/admin/updatemovie/:id", roleControler.admin ,adminMovieRoute.updatemovie);

    //POST删除电影使用POST;
    router.post("/admin/removemovie", roleControler.admin ,adminMovieRoute.removemovie)
    //POST
    router.post("/admin/movie/new", roleControler.admin , adminMovieRoute.new);

    //后台管理页
    router.get("/admin/admin", roleControler.admin ,adminMovieManage.manage)
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

    //4.x版本的是通过 express.Router()新建出来的实例作为中间件, 以前的直接把路由放到app就好了, 有区别哦;
    app.use(router); //把所有的路由作为app的中间件;
};