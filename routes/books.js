const router = require('express').Router();
const passportSetup = require('../config/passport-setup');
const Book = require('../models/book');
const roles = require('../config/roles');


router.post('', function (req, res) {
    Book.creat(req.body, (error, result) => {
        if (error) { res.send(error) }
        if (result) { res.send(result) }
    })
})

router.get('', function (req, res) {
    Book.getAll(parseInt(req.body.limit), (result) => {
        res.send(result)
    })
})

router.route('/:id')

    .get(function (req, res) {
        if (!req.user) { return res.send('plz sign in') }
        if (req.user.id === req.params.id && roles.conditionalCheck(req.user.role, roles.window.Books, roles.action.Read)) {
            Book.getByID(req.params.id, (result) => {
                return res.send(result)
            })
        }
        if (roles.generalCheck(req.user.role, roles.window.Books, roles.action.Read)) {
            Book.getByID(req.params.id, (result) => {
                return res.send(result)
            })
        }
    })

    .delete(function (req, res) {
        if (!req.user) { return res.send('plz sign in') }
        if (req.user.id === req.params.id && roles.conditionalCheck(req.user.role, roles.window.Books, roles.action.Delete)) {
            Book.delete(req.params.id, (result) => {
                return res.send(result)
            })
        }
        if (roles.generalCheck(req.user.role, roles.window.Books, roles.action.Delete)) {
            Book.delete(req.params.id, (result) => {
                return res.send(result)
            })
        }
        return res.send('Not Authorized')
    })


module.exports = router;