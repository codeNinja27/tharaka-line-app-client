import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import './landing_page.css';

export function landingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/user" />;
    // }

    return (
        <div className="landingPage">
            <div className="landingLogoDiv" ><img src={logo} alt="logo" /></div>
            <div className="appDescription">
                <h1 role="app name" className="landingTitle">Welcome to the Line App</h1>
                <p className="desc" role="app description" >
                    Never waste time waiting in lines again. Line App will save your valuable time. You can either ask for someone else to wait in line for you or wait in line for someone else. Stop waiting and <Link className="landingRegisterinLink" to="/register">register</Link> today.
                </p>
                <p className="loginDesc" >Already have an account? <Link className="landingLoginLink" to="/login">Login here</Link></p>
            </div>
            {/* <Link className="landingRegisterinLink" to="/register">Register</Link> */}
            {/* <Link className="landingLoginLink" to="/login">Login here</Link> */}
        </div>
    );
}

const mapStateToProps = state => ({
    // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(landingPage);