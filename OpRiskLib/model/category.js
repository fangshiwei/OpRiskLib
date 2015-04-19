var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var CategorySchema = new mongoose.Schema({
    type : String,
    movies : [
        {
            type : ObjectId,
            //ref的参数Movie就是指向表名, 一堆schema和model很容易弄乱;
            ref : "Movie"
        }
    ]
});

CategorySchema.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    },
    findByType : function(type,cb) {
        return this.findOne({type : type}).exec(cb);
    },
    findByMovieId : function(movie_id,cb) {
        return this.findOne({movie_id:movie_id}).exec(cb)
    }
};

//每一次保存之前会调用这个方法;
CategorySchema.pre("save",function(next) {
    next();
});

//为mongodb定义了这个数据模型, 这个数据模型和当前的数据库绑定了;
//这个就是数据库内部的table名字;
var Category = mongoose.model("CategorySchema",CategorySchema);
module.exports =  Category;