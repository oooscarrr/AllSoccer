import React, {useState, useEffect} from 'react';
const axios = require('axios');

const PlayerProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const user = props.user, setUser = props.setUser;
    // const getUsername = async () => {
    //     const response = await axios('/api/playerProfile');
    //     setUsername(response.data);
    // }

    // useEffect(() => {
    //     getUsername();
    // },[username]);

    return <h1>{user.username}</h1>
}

export default PlayerProfile;