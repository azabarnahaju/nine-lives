const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cat'
    }],
});

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
