import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

const Header = (props) => {
    // const [profileButtonTo, setProfileButtonTo] = props.user ? '/profile' : '/loginRegister';
    // const [profileButtonTo, setProfileButtonTo] = useState('/loginRegister');

    return (
        <table className="Header">
            <tbody>
                <tr>
                    <td className='LogoHolder'>
                        <NavLink to='/'>
                            <img className='Logo' src={'../logo.png'} alt={'logo'} />
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className='BigTitle' to='/'>
                            All Soccer
                        </NavLink>
                    </td>
                    <td className='UserProfileButtonWrapper'>
                        {props.user ?
                            <NavLink className='ProfileButton' to='/profile'>
                                Profile
                            </NavLink>
                            : <NavLink className='ProfileButton' to='/loginRegister'>
                                Profile
                            </NavLink>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Header;