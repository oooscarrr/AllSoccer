import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/PlayerProfile.css';
const axios = require('axios');

const PlayerProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const user = props.user, setUser = props.setUser;

    const setRealName = async e => {
        e.preventDefault();
        const newName = e.target.realname.value;
        const response = await axios({
            method: "post",
            url: "/api/setRealName",
            data: {
                'username': user.username,
                'realname': newName
            },
        });
        if (response.data.status) {
            alert('Set name success');
            setUser(response.data.user);
        }
        else {
            alert(response.data.message);
        }
    };

    const logOut = () => {
        setUser(null);
    };

    return (
        <div className='PlayerProfile'>
            <h1>{user.realname}</h1>
            <div>username: {user.username}</div>
            <form onSubmit={setRealName}>
                <input type="text" placeholder={'Your real name'} name="realname"/>
                <input type="submit" value="submit"/>
            </form>
            {user.team ? <h1>
                <NavLink className='TeamButton' to='/teamProfile'>{user.team}</NavLink>
            </h1>
            : <div className='ButtonWrapper'>
                <NavLink className='Button' to='/createTeam'>Create Team</NavLink>
                 <text>or</text>
                 <NavLink className='Button' to='/search'>Find a Team</NavLink>
            </div>
            }
            <div className='Stats'>
                <div>&#9917;Goals: {user.goal}</div>
                <div>&#127919;Assists: {user.assist}</div>
            </div>
            <div className='ButtonWrapper'>
                <NavLink className='Button' to='/' onClick={() => logOut()}>Log Out</NavLink>
            </div>
        </div>
    );
};

export default PlayerProfile;