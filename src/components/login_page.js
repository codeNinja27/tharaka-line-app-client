import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './login_page.css';
import LoginForm from './login_form';

export function loginPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/user" />;
    }

    return (
        <div className="loginPage">
            <h2>Login</h2>
            <LoginForm />
            <Link className="registerLink" to="/register">Register</Link>
            <span className="spacer">||</span>
            <Link className="landingLink" to="/">Landing Page</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(loginPage);
