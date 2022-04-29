const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Player = mongoose.model('Player');


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


router.post('/register', async function (req, res) {
    const newPlayer = {
        username: req.body.username,
        isManager: false,
        goal: 0,
        assist: 0,
        number: 0,
        realname: 'Anonymous'
    };
    Player.register(new Player(newPlayer), req.body.password, function (err, user) {
        if (err) {
            res.json({ status: false, message: err.toString() });
        }
        else {
            passport.authenticate('local')(req, res, function () {
                res.json({ status: true, user: user, message: 'Register success.'});
            });
        }
    });
});


router.post('/setRealName', async (req, res) => {
    const theUser = await Player.findOneAndUpdate({username: req.body.username}, {realname: req.body.realname}, {new: true});
    if (theUser) {
        res.json({status: true, user: theUser});
    }
    else {
        res.json({status: false, message: 'error!'});
    }
});


router.get('/getRoster', async (req, res) => {
    const theRoster = await Player.find({_id: {$in: req.query.playerIDs}});
    res.send(theRoster);
});


module.exports = router;