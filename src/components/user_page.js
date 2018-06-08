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
    componentDidMount(){
        //when you refresh the page logged in prop will always set to false.
        //grab the auth token from local storage 
    }

    logOut() {
        this.props.dispatch(logout());
    }
    render() {
        const authTokenUser = loadAuthToken(); 

        if(authTokenUser === null) {
            return <Redirect to="/" />;
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
