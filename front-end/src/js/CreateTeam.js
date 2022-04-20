import React, {useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";
import '../css/CreateTeam.css';
const axios = require('axios');

const CreateTeam = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const user = props.user, setUser = props.setUser;
    const [created, setCreated] = useState(false);

    const handleCreate = async e => {
        e.preventDefault();
        const today = new Date();
        const todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        const response = await axios({
            method: "post",
            url: "/api/createTeam",
            data: {
                'username': user.username,
                'teamName': e.target.teamname.value,
                'location': e.target.location.value,
                'players': e.target.players.value.split(','),
                'createDate': todayString
            }
        });
        if (response.data.status) {
            setUser(response.data.user);
            alert(response.data.message);
            setCreated(true);
        }
        else {
            alert(response.data.message);
        }
    }

    if (created) {
        return <Navigate to='/profile'/>;
    }
    return (
        <div>
            <h1>Create Your Own Team</h1>
            <form onSubmit={handleCreate}>
                <div>
                    Team Name:<input type="text" name="teamname"/>
                </div>
                <div>
                    Location:<input type="text" name="location"/>
                </div>
                <div>
                    Players:<input type="text" placeholder='Seperate With Comma' name="players"/>
                </div>
                <div>
                <input type="submit" value="Create"/>
                </div>
            </form>
        </div>
    );
}

export default CreateTeam;