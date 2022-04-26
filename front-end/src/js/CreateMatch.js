import React, {useState, useEffect} from 'react';
// import { NavLink, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import '../css/CreateMatch.css';
import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');

const CreateMatch = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [sinceDate, setSinceDate] = useState(null);

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
        alert(new Date(response.data.date));
    };

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