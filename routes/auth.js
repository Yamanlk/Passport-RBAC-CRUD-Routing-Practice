const router = require('express').Router();
const passport = require('passport');

router.post('/local/signUp', passport.authenticate('local-signUp', {
    failureFlash: true,
    successFlash: true,
    failureRedirect: '/fail',
}), (req, res) => {
    res.redirect('/users/' + req.user.id)
})

router.post('/local/signIn', passport.authenticate('local-signIn', {
    failureFlash: true,
    successFlash: true,
    failureRedirect: '/fail',
}), (req, res) => {
    res.redirect('/users/' + req.user.id)
})

module.exports = router;