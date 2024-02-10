const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
    firstName:{type: String, require: true},
    lastName:{type: String, require: true},
    address:{type: String},
    gender:{type:String, enum: ['male', 'female', 'other'], default:'other'},
    role: {type: String, enum: ['manager', 'user'], default:'user'},
    dateOfBirth:{type: Date}, 
    email:{type: String, require: true},
    phone:{type: Object, home: {type: String, min: 11, max: 11}, office: {type: String, min: 11, max: 11}},
    password:{type: String, require: true}, 
    createdAt: {type: Date}
}))


module.exports = User;