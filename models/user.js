const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Role = require('../config/roles')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: Role.role.User }
})

const userModel = mongoose.model('user', userSchema)

module.exports.creatUser = function (user) {
    bcrypt.hash(user.password, 10, (error, hashedPassword) => {
        var createdUser = new userModel({
            username: user.username,
            password: hashedPassword,
        })
        createdUser.save()
            .then((user) => {
                return user
            })
    })
}

module.exports.findById = function (id, cb) {
    userModel.findById(id, (err, userFound) => {
        if (err) return cb(err, null)
        return cb(null, userFound)
    })
}

module.exports.findByName = function (name, callback) {
    userModel.findOne({ username: name }, (error, userFound) => {
        return callback(error, userFound)
    })
}

module.exports.checkPssword = function (user, password) {
    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {console.log('Catch that error : ' + error)}
        return result  
    })
}

module.removeUser = function (user) {
    userModel.deleteOne(user, (err) => {
        if (err) return false
        return true
    })
}
