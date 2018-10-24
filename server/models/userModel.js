const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryptPassword = require('../helpers/encryptPassword.js');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Min characters length is 4']
    },
    viaThirdParty: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = encryptPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;