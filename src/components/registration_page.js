import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './registration_page.css';
import RegistrationForm from './registration_form';

export function RegistrationPage(props) {

    if (props.loggedIn) {
        return <Redirect to="/user" />;
    }
    return (
        <div className="registrationContainer">
            <h2>Register</h2>
            <RegistrationForm />
            <Link className="loginLink" to="/login">Login</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
