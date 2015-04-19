var mongoose = require("mongoose");
var oplibUser = new mongoose.Schema({
    name : {
        type : String,
        unique : true
    },
    soeid: {
        type : String,
        unique : true
    },
    password : String,
    role : {
        type : Number,
        default : 1
    }
});

oplibUser.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    },
    findByNames : function( name, cb ) {
        return this.find({"name" : name}).exec( cb );
    },
    findByName : function( name, cb ) {
        return this.findOne({"name" : name}).exec( cb );
    },
    findBySOEID : function (name, cb){
        return this.findOne({ "soeid" : soeid }).exec(cb);
    }
};
//每一次保存之前会调用这个方法;
oplibUser.pre("save",function(next) {
    next();
});
//为mongodb定义了这个数据模型, 这个数据模型和当前的数据库绑定了;
var OplibUser = mongoose.model("OPLIB_USER", oplibUser);
module.exports = OplibUser;