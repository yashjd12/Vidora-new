import React from "react"
import "./Header.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../../images/vidora-logo.png';

const Header = () => {
    let navigate = useNavigate();

    const logoutHandler = () => {
        // resetUserSession();
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={logo} alt="logo" /></Link>
                <Link to="/movies/explore" style={{ textDecoration: "none" }}><span>Explore</span></Link>
                <Link to="/movies/live" style={{ textDecoration: "none" }}><span>Live Stream</span></Link>
                {/* <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link> */}
            </div>
            <div className="headerRight">
                {/* <input type='button' value='Logout' onClick={logoutHandler} /> */}
                <button class="custom-btn btn-3" onClick={logoutHandler}><span>Logout</span></button>
            </div>
        </div>
    )
}

export default Header