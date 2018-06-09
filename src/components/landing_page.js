import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import './landing_page.css';

export function landingPage(props) {
    return (
        <div className="landingPage">
            <div className="landingLogoDiv" ><img src={logo} alt="logo" /></div>
            <div className="appDescription">
                <h1 className="landingTitle">Welcome to the Line App</h1>
                <p className="desc" >
                    Never waste time waiting in lines again. Line App will save your valuable time. You can either ask for someone else to wait in line for you or wait in line for someone else. Stop waiting and <Link className="landingRegisterinLink" to="/register">register</Link> today.
                </p>
                <p className="loginDesc" >Already have an account? <Link className="landingLoginLink" to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default landingPage