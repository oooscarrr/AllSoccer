import React, {useEffect, useState} from 'react';
// import { NavLink, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Navigate } from 'react-router-dom';
import '../css/FindMatch.css';
const axios = require('axios');

const OpponentItem = (props) => {
    const acceptMatch = async () => {
        if (window.confirm('Play against ' + props.theMatch.teams[0] + '?')) {
            const response = await axios({
                method: 'post',
                url: '/api/acceptMatch',
                data: {
                    'id': props.theMatch._id,
                    'teamName': props.teamName
                }
            });
            if (response.data) {
                alert("Match added to both teams' schedules!");
                //return to home page
                props.setAccepted(true);
            }
            else {
                alert("error!");
            }
        }
    };

    return (
        <tr className='OpponentRow'>
            <td>{props.theMatch.teams[0]}</td>
            <td>{new Date(props.theMatch.date).toDateString()}</td>
            <td>{new Date(props.theMatch.date).toTimeString().slice(0, 5)}</td>
            <td>{props.theMatch.city}</td>
            <td>{props.theMatch.location}</td>
            {props.user.isManager ? <button className='AcceptButton' onClick={acceptMatch}>Accept</button> : <td></td>}
        </tr>
    );
};

const FindMatch = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [availableMatches, setAvailableMatches] = useState([]);
    useEffect(() => {
        const getAvailableMatches = async () => {
            const response = await axios('api/getAvailableMatches', {params: {ownTeam: props.team.name}});
            if (response.data) {
                setAvailableMatches(response.data);
            }
            else {
                alert('Error finding available matches!');
            }
        };
        if (props.team) {
            getAvailableMatches();
        }
    }, [props.team]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [filteredMatches, setFilteredMatches] = useState([]);
    // const [filteredMatches, setFilteredMatches] = useState(availableMatches.filter(match => {
    //     return match.city === props.team.city;
    // }));
    const handleFilter = e => {
        e.preventDefault();
        setFilteredMatches(availableMatches.filter(match => {
            let result = true;
            if (e.target.city.value) {
                result = (e.target.city.value === match.city);
            }
            if (startDate && result) {
                result = (startDate <= new Date(match.date));
            }
            if (endDate && result) {
                result = (endDate >= new Date(match.date));
            }
            return result;
        }));
    };

    const getTeam = async (teamName) => {
        const response = await axios('api/getTeam', {params: {name: teamName}})
        props.setTeam(response.data);
    }

    const [accepted, setAccepted] = useState(false);
    if (accepted) {
        getTeam(props.team.name);
        return <Navigate to='/'/>;
    }

    if (!props.user) {
        return <Navigate to='/loginRegister'/>;
    }

    return (
        <div className='FindMatch'>
            <h1>Get an Opponent</h1>
            <form onSubmit={handleFilter}>
                From <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} 
                showTimeSelect minDate={new Date()} dateFormat="Pp" popperPlacement="auto"/>
                To <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} 
                showTimeSelect minDate={new Date()} dateFormat="Pp" popperPlacement="auto"/>
                <input type="text" placeholder={'Enter City'} name="city" />
                <input type="submit" value="Filter" />
            </form>
            <table className='table'>
                <thead>
                    <tr className='OpponentRow'>
                        <td>Team</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td>City</td>
                        <td>Location</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredMatches.map(match => <OpponentItem theMatch={match} teamName={props.team.name} 
                    user={props.user} setAccepted={setAccepted} key={match._id}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default FindMatch;