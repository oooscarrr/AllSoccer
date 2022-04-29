import React, {useEffect, useState} from 'react';
// import { NavLink } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import { Modal } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
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

    const team = props.team, setTeam = props.setTeam;

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
                setFixture(response.data.sort((a, b) => a.date<=b.date ? 1 : -1));
            }
        };
        getFixture();
    }, [props.team]);

    const handleAcceptJoin = async (acceptedName) => {
        const response = await axios({
            method: 'post',
            url: '/api/acceptJoin',
            data : {
                playerUsername: acceptedName,
                teamName: team.name
            }
        });
        alert(response.data.message);
        if (response.data.status) {
            setTeam(response.data.team);
        }
    };
    const handleDeclineJoin = async (declinedName) => {
        const response = await axios({
            method: 'post',
            url: '/api/declineJoin',
            data : {
                playerUsername: declinedName,
                teamName: team.name
            }
        });
        alert(response.data.message);
        if (response.data.status) {
            setTeam(response.data.team);
        }
    };

    // const [showEditStats, setShowEditStats] = useState(false);
    // const openEditStats = () => setShowEditStats(true);
    // const closeEditStats = () => setShowEditStats(false);
    // const handleEditStats = () => {
    //     if (props.user.isManager && props.user.team===props.team.name) {
    //         openEditStats();
    //     }
    // };

    return (
        <div className='TeamProfile'>
            <h1>{team.name}</h1>
            <div>&#9996;W{team.history[0]}  &#128528;D{team.history[1]}  &#128557;L{team.history[2]}</div>
            {/* <div className='SomeButtons'>
                {!user.team ? <div>
                    <button>Request to Join</button>
                </div> : null}
                {user.isManager && user.team !== team.name ? <div>
                    <button>Invite to Match</button>
                </div> : null}
            </div> */}
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
                            {roster.map(pl => <PlayerItem player={pl} key={pl._id}/>)}
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
                            {fixture.map(mtch => <MatchItem match={mtch} ownTeam={props.team.name} key={mtch._id}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {props.user.isManager && props.user.team===props.team.name && props.team.requests.length ? 
            <div className='JoinRequests'>
                <text className='TableTitle'>Join Requests</text>
                <table>
                    <tbody>
                        {team.requests.map(requestName => {
                            return (
                            <div>
                                <text>{requestName}</text>
                                <button className='AcceptDeclineButton' onClick={() => handleAcceptJoin(requestName)}>Accept</button>
                                <button className='AcceptDeclineButton' onClick={() => handleDeclineJoin(requestName)}>Decline</button>
                            </div>
                            );
                        })}
                    </tbody>
                </table>
            </div> : null}
 
            {/* <Modal show={showEditStats} onHide={closeEditStats}>
                <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeEditStats}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeEditStats}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    );
};

export default TeamProfile;