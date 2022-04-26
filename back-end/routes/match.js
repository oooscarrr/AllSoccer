const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Match = mongoose.model('Match');
// const Team = mongoose.model('Team');

router.post('/createMatch', async (req, res) => {
    const newMatch = await Match.create({
        teams: [req.body.homeTeam],
        date: req.body.date,
        city: req.body.city,
        location: req.body.location,
        status: 0
    });
    if (newMatch) {
        res.json({
            status: true,
            message: 'Match invitation added to lobby!',
            date: newMatch.date
        });
    }
    else {
        res.json({
            status: false,
            message: 'Something Wrong!'
        });
    }
});

router.get('/getAvailableMatches', async (req, res) => {
    const availableMatches = await Match.find({teams: {$size: 1}});
    res.send(availableMatches);
});


module.exports = router;