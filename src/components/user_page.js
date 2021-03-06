import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import UserEventList from './user_event_list';
import EventForm from './event_form';
import {logout} from '../actions/auth';
import {loadAuthToken } from '../local-storage';
import './user_page.css';
import logo from '../logo.png';

export class UserPage extends React.Component {

    logOut() {
        this.props.dispatch(logout());
    }
    render() {
        const authTokenEvents = loadAuthToken(); 

        if(!this.props.loggedIn) {
            if (authTokenEvents === null) {
                return <Redirect to="/" />;
            } 
        }
            
        return (
            <div className="userHome">
                
                <div className="userHeaderDiv">
                    <Link className="eventLink" to="/events">Events</Link>
                    <Link className="userLogoutLink" onClick={() => this.logOut()} to="/" >Logout</Link>
                    <div className="logoDiv" ><img src={logo} alt="logo" /></div>
                </div>
                <h2>My Events</h2>
                <div className="userEventList">
                    <UserEventList />   
                </div>
            
                <div className="eventForm">
                    <EventForm />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(UserPage);
