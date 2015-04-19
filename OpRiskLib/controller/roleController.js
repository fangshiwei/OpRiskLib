module.exports.admin = function(req,res,next) {
    if(!req.session.user) {
        res.redirect("/signin");
    }else if(req.session.user&&req.session.user.role<10) {
        res.render("info",{msg:"权限不足，请用管理员登陆"});
    }else if(req.session.user.role > 10) {
        next();
    };
};