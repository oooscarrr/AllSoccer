import React, {useEffect} from 'react';
const axios = require('axios');

const PlayerProfile = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const user = props.user, setUser = props.setUser;

    const setRealName = async e => {
        e.preventDefault();
        const newName = e.realname;
        const response = await axios({
            method: "post",
            url: "/api/setRealName",
            data: {
                'username': user.username,
                'realname': newName
            },
        });
        if (response.data.status) {
            alert('Success');
            setUser(response.data.user);
        }
        else {
            alert(response.data.message);
        }
    }

    return (
        <div>
            <h1>Username: {user? user.username : 'nothing'}</h1>
            <h1>Real Name: {user? user.realname : 'nothing'}</h1>
            <form onSubmit={setRealName}>
                <input type="text" placeholder={'Your real name'} name="realname"/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default PlayerProfile;