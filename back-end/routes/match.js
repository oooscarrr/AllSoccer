const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const Team = mongoose.model('Team');

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
    //find matches with only one team that is not user's own team
    const availableMatches = (await Match.find({teams: {$size: 1}})).filter(match => match.teams[0] !== req.query.ownTeam);
    res.send(availableMatches);
});

router.post('/acceptMatch', async (req, res) => {
    let result = true;
    const theMatch = await Match.findById(req.body.id);
    theMatch.teams.push(req.body.teamName);
    theMatch.save((err) => {
        if (err) {
            result = false;
            console.log(err);
        }
    });

    const team1 = await Team.findOne({name: theMatch.teams[0]});
    team1.matches.push(theMatch);
    team1.save((err) => {
        if (err) {
            result = false;
            console.log(err);
        }
    });
    const team2 = await Team.findOne({name: theMatch.teams[1]});
    team2.matches.push(theMatch);
    team2.save((err) => {
        if (err) {
            result = false;
            console.log(err);
        }
    });

    res.send(result);
});


module.exports = router;