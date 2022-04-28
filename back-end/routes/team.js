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


module.exports = router;