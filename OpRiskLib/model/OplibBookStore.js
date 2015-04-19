var mongoose = require("mongoose");
var oplibBookStore = new mongoose.Schema({
    oplibBookStoreId : {
        type: Number,
        unique : true
    },
    bookName : String,
    author : String,
    publishing : String,
    owner : String,
    language : String,
    country : String,
    brief : String,
    abstract : String,
    meta:{
        createAt : {
            type : Date,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});
oplibBookStore.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    },
    findByBookId : function (oplibBookStoreId, cb) {
        return this.findOne({ "oplibBookStoreId": oplibBookStoreId }).exec(cb);
    },
    findByBookName : function (bookName, cb) {
        return this.find({ "bookName" : bookName }).exec(cb);
    },
    findByOwner : function (owner, cb) {
        return this.find({ "owner" : owner }).exec(cb);
    },
    findByAuthor : function (author, cb) {
        return this.find({ "author" : author }).exec(cb);
    }
};
//save
oplibBookStore.pre("save",function(next) {
    next();
});
//define model
var OplibBookStore = mongoose.model("OPLIB_BOOK_STORE", oplibBookStore);
module.exports = OplibBookStore;