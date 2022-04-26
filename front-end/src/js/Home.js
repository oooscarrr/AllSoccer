import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Home.css';

const Home = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    return (
        <div>
            <div className='HomeButtonWrapper'>
                <NavLink className='HomeButton' to='/search'>Search Team/Player</NavLink>
            </div>
            <div className='HomeButtonWrapper'>
                <NavLink className='HomeButton' to='/findMatch'>Find a Match</NavLink>
            </div>
            {(props.user && props.user.isManager) && 
                <div className='HomeButtonWrapper'>
                    <NavLink className='HomeButton' to='/createMatch'>Create Match</NavLink>
                </div>
            }
            
        </div>
    );
}

export default Home;