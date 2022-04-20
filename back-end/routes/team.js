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
            location: req.body.location,
            manager: req.body.username,
            players: req.body.players,
            createdAt: req.body.createDate
        });
        const manager = await Player.findOneAndUpdate({username: req.body.username}, {team: req.body.teamName}, {new: true});
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