var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "_id": String,
    "username": {type: String, required:true, unique:true},
    "password": {type: String, required:true},
    "createdTs": { type: Date, required: false, "default": Date.now },
    "modifiedTs": { type: Date, required: false, "default": Date.now }
});

userSchema.pre('save', function(next) {
    this.modifiedTs = new Date();
    next();
});
module.exports = userSchema;