import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

const Header = (props) => {
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
                    <td className='ProfileButtonWrapper'>
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