const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')


passport.serializeUser(function (user, done) {
    return done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user)
    })
})

passport.use('local-signIn', new LocalStrategy({ passReqToCallback: true },

    function (req, username, password, done) {
        User.findByName(req.body.username, (error, user) => {
            if (error) return done(error, user, { message: 'Somthing went wrong, try agian' })
            if (!user) return done(null, user, { message: 'Username is invalid' })
            if (!User.checkPssword(user, req.body.password)) return done(error, user, { message: 'Password is invalid' })
            return done(error, user, { message: 'Signed In Successfuly' })
        })
    })
)


passport.use('local-signUp', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
        User.findByName(username, (error, user) => {
            if (error) return done(error, user, { message: 'Somthing went wrong, try agian' })
            if (user) { return done(null, false, { message: 'This username is already taken' }) }
            if (!user) {
                const newUser = {
                    username: username,
                    password: password,
                }
                const user = User.creatUser(newUser)
                if (user === null) { return done(null, false, { message: 'Somthing went wrong !, please try again' }) }
                return done(null, user, { message: 'You have singed Up successfuly' })
            }
        })
    }
))