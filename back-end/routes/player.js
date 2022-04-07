const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Player = mongoose.model('Player');

// router.post('/register', (req, res) => {
//     Player.register(new Player({username: req.body.username}), req.body.password, function(err, user){
//         if(err) {
//             res.status(500).json({status: false, message: err});
//         }
//         else {
//             user.save(function(err){
//                 if (err) {
//                     res.status(500).json({status: false, message: err});
//                 }
//                 else {
//                     passport.authenticate('local')(req, res, function(){
//                         res.status(200).json({status: true});
//                     });
//                 }
//             });
//         }
//     });
// });
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err.toString());
                }
                res.json({status: true, user: user, message: 'Login success.'});
            });
        } else {
            res.json({status: false, message: 'Your login or password is incorrect.'});
        }
    })(req, res, next);
});

router.post('/register', function (req, res) {
    Player.register(new Player({ username: req.body.username }),
        req.body.password, function (err, user) {
            if (err) {
                res.json({ status: false, message: err.toString() });
            }
            else {
                passport.authenticate('local')(req, res, function () {
                    res.json({ status: true, theUser: user });
                });
            }
        });
});

router.get("/playerProfile", (req, res) => {
    res.send('Oscar3');
});

module.exports = router;