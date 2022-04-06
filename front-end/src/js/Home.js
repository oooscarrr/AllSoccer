import React, {useState, useEffect} from 'react';
const axios = require('axios');

const Home = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    
    const [gibberish, setGibberish] = useState('');
    const getGibberish = async () => {
        const response = await axios('/home');
        setGibberish(response.data);
    }

    useEffect(() => {
        getGibberish();
    },[gibberish]);

    return <p>{gibberish}</p>
}

export default Home;