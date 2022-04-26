import React, {useEffect, useState} from 'react';
// import { NavLink, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import '../css/FindMatch.css';
const axios = require('axios');

const OpponentItem = (props) => {
    return (
        <tr>
            <td>{props.teamName}</td>
            <td>{props.date}</td>
            <td>{props.time}</td>
            <td>{props.city}</td>
            <td>{props.location}</td>
        </tr>
    )
};

const FindMatch = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [availableMatches, setAvailableMatches] = useState([]);
    const getAvailableMatches = async () => {
        const response = await axios('api/getAvailableMatches');
        if (response.data) {
            setAvailableMatches(response.data);
        }
        else {
            alert('Error finding available matches!');
        }
    };
    useEffect(() => {
        getAvailableMatches();
    });

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

    return (
        <div>
            <h1>Match Lobby</h1>
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
                    <tr>
                        <th>Team</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>City</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMatches.map(match => <OpponentItem teamName={match.teams[0]} date={new Date(match.date).toDateString()}
                    time={new Date(match.date).toTimeString()} city={match.city} location={match.location}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default FindMatch;