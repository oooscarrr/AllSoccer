import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import '../css/CreateMatch.css';
import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');

const CreateMatch = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [sinceDate, setSinceDate] = useState(null);
    const [created, setCreated] = useState(false);

    const handleCreate = async e => {
        e.preventDefault();
        const matchCity = e.target.city.value;
        const matchLocation = e.target.location.value;
        const response = await axios({
            method: "post",
            url: "/api/createMatch",
            data: {
                'city': matchCity,
                'location': matchLocation,
                'date': sinceDate,
                'homeTeam': props.user.team
            }
        });
        if (response.data) {
            alert('New match invitation at ' + new Date(response.data.date));
            setCreated(true);
        }
        else {
            alert('Fail to create match');
        }
    };

    if (created) {
        return <Navigate to='/'/>;
    }

    return (
        <div className='CreateMatch'>
            <h1>Create a Match Invitation</h1>
            <form onSubmit={handleCreate}>
                <div className='formWrapper'>
                    <div className='datetime'>
                        Date and Time:<DatePicker selected={sinceDate} onChange={(date) => setSinceDate(date)} placeholderText='Select Date' 
                        excludeOutOfBoundsTimes showTimeSelect minDate={new Date()} dateFormat="Pp" popperPlacement="auto"/>
                    </div>
                    <div>
                        City:<input type="text" name="city"/>
                    </div>
                    <div>
                        Location:<input type="text" name="location"/>
                    </div>
                    <div>
                    <input type="submit" value="Create"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateMatch;