const mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Player = mongoose.model('Player');

passport.use(new LocalStrategy(Player.authenticate()));

passport.serializeUser(Player.serializeUser());
passport.deserializeUser(Player.deserializeUser());
