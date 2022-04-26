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
        const newTeam = await Team.create({
            name: req.body.teamName,
            city: req.body.city,
            manager: req.body.username,
            players: req.body.players,
            createdAt: req.body.createDate,
            matches: [],
            invitations: [],
            requests: []
        });
        const changes = {
            team: req.body.teamName,
            isManager: true
        };
        const manager = await Player.findOneAndUpdate({username: req.body.username}, changes, {new: true});
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
                message: 'Something wrong'
            });
        }
    }
});


module.exports = router;