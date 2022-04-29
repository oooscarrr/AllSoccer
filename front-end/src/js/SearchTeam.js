import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import '../css/SearchTeam.css';
const axios = require('axios');

const TeamItem = (props) => {
    const sendJoinRequest = async () => {
        const response = await axios({
            method: 'post',
            url: '/api/sendJoinRequest',
            data: {
                'playerUsername': props.user.username,
                'teamName': props.team.name
            }
        });
        alert(response.data.message);
    };

    return (
        <tr className='TeamRow'>
            <td onClick={() => props.handleView(props.team)}>{props.team.name}</td>
            <td>{props.team.createdAt}</td>
            <td>{props.team.city}</td>
            <td>{props.team.manager}</td>
            <td>{props.team.history[0]}/{props.team.history[1]}/{props.team.history[2]}</td>
            {!props.user.team ? <button onClick={sendJoinRequest}>Request to Join</button> : null}
        </tr>
    );
};

const SearchTeam = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [teamsToShow, setTeamsToShow] = useState([]);

    const handleSearch = async e => {
        e.preventDefault();
        const filter = {};
        filter.name = e.target.name.value;
        filter.city = e.target.city.value;
        const response = await axios({
            method: 'post',
            url: '/api/search',
            data: filter
        });
        if (response.data) {
            setTeamsToShow(response.data);
        }
    }

    const [viewTeam, setViewTeam] = useState(false);
    const handleView = teamToView => {
        props.setTeamToShow(teamToView);
        setViewTeam(true);
    };

    if (!props.user) {
        return <Navigate to='/loginRegister'/>;
    }

    if (viewTeam) {
        return <Navigate to='/teamProfile'/>
    }

    return (
        <div className='SearchTeam'>
            <h1>Team Search</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder={'Enter Team Name'} name="name"/>
                <input type="text" placeholder={'Enter City'} name="city"/>
                <input type="submit" value="Search"/>
            </form>
            <table className='table'>
                <thead>
                    <tr className='TeamRow'>
                        <td>Name(Tap to view)</td>
                        <td>Since</td>
                        <td>Base</td>
                        <td>Manager</td>
                        <td>Match History</td>
                    </tr>
                </thead>
                <tbody>
                    {teamsToShow.map(tm => <TeamItem team={tm} user={props.user} handleView={handleView} key={tm._id}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default SearchTeam;