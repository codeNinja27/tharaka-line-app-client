import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import logo from '../logo.png';
// import './landing_page.css';

export function landingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/user" />;
    // }

    return (
        <div className="landingPage">
            <div className="landingLogoDiv" ><img src={logo} alt="logo" /></div>
            <h1 className="landingTitle">Welcome to Line App</h1>
            <Link className="landingLoginLink" to="/login">Login</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(landingPage);