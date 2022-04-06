import React, {useState, useEffect} from 'react';
const axios = require('axios');

const PlayerProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const [username, setUsername] = useState('');
    const getUsername = async () => {
        const response = await axios('/playerProfile');
        setUsername(response.data);
    }

    useEffect(() => {
        getUsername();
    },[username]);

    return <h1>{username}</h1>
}

export default PlayerProfile;