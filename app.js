const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectFlash = require('connect-flash');

const passportSetup = require('./config/passport-setup');
const authRoute = require('./routes/auth')
const booksRoute = require('./routes/books')


const Role = require('./config/roles');


const app = express()
app.use(expressSession({
    secret: 'secretKey',
    maxAge: 24 * 60 * 60 * 1000                             //1000 ms * 60 * 60 * 24 ==> 1 Day. 
}))
1
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(connectFlash())

mongoose.connect('mongodb://localhost/test')

app.use('/auth', authRoute)
app.use('/books', booksRoute)

app.get('/logout', function (req, res) {
    req.logOut()
    res.redirect('/logedOut')
})


app.listen('3000')