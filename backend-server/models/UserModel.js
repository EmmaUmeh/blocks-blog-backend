const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users;