import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../css/TeamProfile.css';
const axios = require('axios');

const PlayerItem = (props) => {

};

const MatchItem = (props) => {

};

const TeamProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const team = props.team, user = props.user;

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

                </div>
                <div className='Fixture'>

                </div>
            </div>
        </div>
    );
};

export default TeamProfile;