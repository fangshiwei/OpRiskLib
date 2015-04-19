var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
console.log(  mongoose.Schema.Types.ObjectId )
var CommentSchema = new mongoose.Schema({
    movie_id : String,
    replys : [
        {
            to : {
                //相当于是引用了User表下_id值为指定值的单元
                type : ObjectId,
                ref : "UserSchema"
            },
            from : {
                type : ObjectId,
                ref : "UserSchema"
            },
            content : String,
            time : {
                type : String,
                default : Date.now()
            }
        }
    ]
});

CommentSchema.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    },
    findByMovieId : function(movie_id,cb) {
        return this.findOne({movie_id:movie_id}).exec(cb)
    },
    findByMovieIdExec : function(movie_id) {
        return this.findOne({movie_id:movie_id});
    }
};

//每一次保存之前会调用这个方法;
CommentSchema.pre("save",function(next) {
    next();
});

//为mongodb定义了这个数据模型, 这个数据模型和当前的数据库绑定了;
                                       //这个就是数据库内部的table名字;
var Comment = mongoose.model("CommentSchema",CommentSchema);
module.exports =  Comment;