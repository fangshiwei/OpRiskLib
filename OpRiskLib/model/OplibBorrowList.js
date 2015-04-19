var mongoose = require("mongoose");
var oplibBorrowList = new mongoose.Schema({
    borrowId : {
        type: Number,
        unique : true
    },
    borrowSoeid: Number,
    oplibBookId : Number,
    borrowDate : {
        type : Date,
        default : Date.now()
    },
    dueDate : Date,
    actualReturnDate : Date
});
oplibBorrowList.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    },
    findByBorrowId : function (borrowId, cb) {
        return this.findOne({ "borrowId": borrowId }).exec(cb);
    },
    findByBorrowSoeid : function (borrowSoeid, cb) {
        return this.find({ "borrowSoeid" : borrowSoeid }).exec(cb);
    },
    findByOplibBookId : function (oplibBookId, cb) {
        return this.find({ "oplibBookId" : oplibBookId }).exec(cb);
    }
};
//每一次保存之前会调用这个方法;
oplibBorrowList.pre("save",function(next) {
    next();
});
//为mongodb定义了这个数据模型, 这个数据模型和当前的数据库绑定了;
var OplibBorrowList = mongoose.model("OPLIB_BORROW_LIST", oplibBorrowList);
module.exports = OplibBorrowList;