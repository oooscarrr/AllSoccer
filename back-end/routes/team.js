const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const Player = mongoose.model('Player');


router.post('/createTeam', async (req, res) => {
    if (await Team.findOne({name: req.body.teamName})) {
        res.json({
            status: false,
            message: 'Team Name Taken'
        });
    }
    else {
        const changes = {
            team: req.body.teamName,
            isManager: true
        };
        const manager = await Player.findOneAndUpdate({username: req.body.username}, changes, {new: true});
        const initialPlayers = await Player.find({username: {$in: req.body.players}, team: null});
        for (const player of initialPlayers) {
            player.team = req.body.teamName;
            player.save((err) => {
                if (err) {console.log(err);}
            });
        }
        initialPlayers.push(manager);
        const newTeam = await Team.create({
            name: req.body.teamName,
            city: req.body.city,
            manager: req.body.username,
            players: initialPlayers,
            createdAt: req.body.createDate,
            matches: [],
            invitations: [],
            requests: [],
            history: [0, 0, 0]
        });
        
        if (manager) {
            res.json({
                status: true,
                team: newTeam,
                user: manager,
                message: 'New team created'
            });
        }
        else {
            res.json({
                status: false,
                message: 'Something wrong with creating team'
            });
        }
    }
});


router.get('/getTeam', async (req, res) => {
    const theTeam = await Team.findOne({name: req.query.name});
    res.send(theTeam);
});


router.post('/search', async (req, res) => {
    const theName = req.body.name ? req.body.name : '';
    const theCity = req.body.city ? req.body.city : '';
    const searchResult = await Team.find({name: {'$regex': theName, "$options": "i"}, city: {'$regex': theCity, "$options": "i"}});
    res.send(searchResult);
});


router.post('/sendJoinRequest', async (req, res) => {
    // const thePlayer = await Player.findById(req.body.playerUsername);
    const theTeam = await Team.findOne({name: req.body.teamName});
    if (theTeam.requests.includes(req.body.playerUsername)) {
        res.json({status: false, message: 'You have already sent request to this team'});
    }
    else {
        theTeam.requests.push(req.body.playerUsername);
        theTeam.save((err) => {
            if (err) {
                console.log(err);
                res.json({status: false, message: 'Error sending request'});
            }
        });
        res.json({status: true, message: 'Request sent'});
    }
});


router.post('/acceptJoin', async (req, res) => {
    const theTeam = await Team.findOne({name: req.body.teamName});
    const thePlayer = await Player.findOne({username: req.body.playerUsername});
    let theMsg = '';
    if (!thePlayer.team) {
        theMsg = 'Success! New player joined your team';
        theTeam.players.push(thePlayer);
        thePlayer.team = req.body.teamName;
        thePlayer.save((err) => {
            if (err) {
                console.log(err);
                res.json({status: false, message: 'Error, can not edit player'});
            }
        });
    }
    else {
        theMsg = 'The player already joined another team!';
    }
    theTeam.requests.splice(theTeam.requests.indexOf(req.body.playerUsername), 1);
    theTeam.save((err) => {
        if (err) {
            console.log(err);
            res.json({status: false, message: 'Error, can not edit team'});
        }
    });
    
    res.json({status: true, message: theMsg, team: theTeam});
});


router.post('/declineJoin', async (req, res) => {
    const theTeam = await Team.findOne({name: req.body.teamName});
    theTeam.requests.splice(theTeam.requests.indexOf(req.body.playerUsername), 1);
    theTeam.save((err) => {
        if (err) {
            console.log(err);
            res.json({status: false, message: 'Error, can not edit team'});
        }
    });
    res.json({status: true, message: 'Oops, you rejected the player', team: theTeam});
});


module.exports = router;