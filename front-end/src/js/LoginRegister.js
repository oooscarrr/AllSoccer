import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
const axios = require('axios');


const LoginRegister = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    
    const [userOn, setUserOn] = useState(false);

    const getTeam = async (teamName) => {
        const response = await axios('api/getTeam', {params: {name: teamName}})
        props.setTeam(response.data);
    }

    const handleLogin = async e => {
        e.preventDefault()
        // get the username and password from the form fields
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            // send the request to the server api to authenticate
            const response = await axios({
                method: "post",
                url: "/api/login",
                data: {
                    'username': username,
                    'password': password
                },
            });
            if (response.data.status) {
                alert(response.data.message);
                props.setUser(response.data.user);
                if (response.data.user.team) {
                    getTeam(response.data.user.team);
                }
                setUserOn(true);
            }
            else {
                alert(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRegister = async e => {
        e.preventDefault()
        // get the username and password from the form fields
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert("Passwords must match!");
            return;
        }
        try {
            // send the request to the server api to authenticate
            const response = await axios({
                method: "post",
                url: "/api/register",
                data: {
                    'username': username,
                    'password': password
                },
            });
            if (response.data.status) {
                alert(response.data.message);
                setUserOn(true);
                props.setUser(response.data.user);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if (userOn) {
        return <Navigate to='/profile'/>;
    }

    return (
        <div>
            <h1>Login to Existing Account</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder={'Username'} name="username"/>
                <input type="password" placeholder={'Password'} name="password"/>
                <input type="submit" value="Log In" />
            </form>

            <h1>Create New Player</h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder={'Username'} name="username" />
                <input type="password" placeholder={'Password'} name="password" />
                <input type="password" placeholder={'Confirm Password'} name="confirmPassword" />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default LoginRegister;