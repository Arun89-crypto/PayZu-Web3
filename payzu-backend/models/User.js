const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;