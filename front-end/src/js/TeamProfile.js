import React, {useEffect, useState} from 'react';
// import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../css/TeamProfile.css';
const axios = require('axios');

const PlayerItem = (props) => {
    return (
        <tr className='ItemRow'>
            <td className='PlayerNumber'>{props.player.number}</td>
            <td>{props.player.realname}</td>
            <td>{props.player.goal}</td>
            <td>{props.player.assist}</td>
        </tr>
    );
};

const MatchItem = (props) => {
    //home(0) or away(1)
    const away = props.match.teams[0] === props.ownTeam ? 0 : 1;
    const played = props.match.score.length === 2 ? 1 : 0;
    return (
        <tr className='ItemRow'>
            <td>{new Date(props.match.date).toLocaleString()}</td>
            {away ? <td>{props.match.teams[0]}</td> : <td>{props.match.teams[1]}</td>}
            {away ? <td>A</td> : <td>H</td>}
            {played ? <td>{props.match.score[0]}-{props.match.score[1]}</td> : <td>TBD</td>}
        </tr>
    );
};

const TeamProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const team = props.team, user = props.user;

    const [roster, setRoster] = useState([]);
    useEffect(() => {
        const getRoster = async () => {
            const response = await axios('/api/getRoster', {params: {playerIDs: props.team.players}});
            if (response.data) {
                setRoster(response.data);
            }
        };
        getRoster();
    }, [props.team]);
    
    const [fixture, setFixture] = useState([]);
    useEffect(() => {
        const getFixture = async () => {
            const response = await axios('/api/getFixture', {params: {matchIDs: props.team.matches}});
            if (response.data) {
                setFixture(response.data);
            }
        };
        getFixture();
    }, [props.team]);

    return (
        <div className='TeamProfile'>
            <h1>{team.name}</h1>
            <div>&#9996;W{team.history[0]}  &#128528;D{team.history[1]}  &#128557;L{team.history[2]}</div>
            <div className='SomeButtons'>
                {!user.team ? <div>
                    <button>Request to Join</button>
                </div> : null}
                {user.isManager && user.team !== team.name ? <div>
                    <button>Invite to Match</button>
                </div> : null}
            </div>
            <div className='RosterAndFixture'>
                <div className='Roster'>
                    <text className='TableTitle'>Roster</text>
                    <table>
                        <thead>
                            <tr className='ItemRow'>
                                <td>#Number</td>
                                <td>Name</td>
                                <td>&#9917;Goal</td>
                                <td>&#127919;Assist</td>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.map(pl => <PlayerItem player={pl}/>)}
                        </tbody>
                    </table>
                </div>
                <div className='Fixture'>
                    <text className='TableTitle'>Fixture</text>
                    <table>
                        <thead>
                            <tr className='ItemRow'>
                                <td>Date</td>
                                <td>Opponent</td>
                                <td>Home/Away</td>
                                <td>Score</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fixture.map(mtch => <MatchItem match={mtch} ownTeam={props.team.name}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamProfile;