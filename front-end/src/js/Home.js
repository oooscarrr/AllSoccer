import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const Home = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return <p>Hello World</p>;
}

export default Home;