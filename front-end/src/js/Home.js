import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
const axios = require('axios');

const Home = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    
    const [gibberish, setGibberish] = useState('');
    const getGibberish = async () => {
        const response = await axios('/api/home');
        setGibberish(response.data);
    }

    useEffect(() => {
        getGibberish();
    },[gibberish]);

    return (
        <div>
            <p>{gibberish}</p>
            <NavLink to='/loginRegister'>Login or Register</NavLink>
            <p> </p>
            <NavLink to='/playerProfile'>Player Profile</NavLink>
        </div>
    );
}

export default Home;