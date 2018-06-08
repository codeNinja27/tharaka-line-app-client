import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import EventList from './event_list';
import {logout} from '../actions/auth';
import './event_page.css';
import logo from '../logo.png';

export class EventPage extends React.Component {

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        } 

        return (
            <div className="userHome">
                <div className="headerDiv">
                    <Link className="userEventLink" to="/user">My Events</Link>
                    <Link className="logoutLink" onClick={() => this.logOut()} to="/" >Logout</Link>
                    <div className="eventLogoDiv" ><img src={logo} alt="logo" /></div>
                </div>
                <div className="eventHolder">
                    <h2 className="eventTitle" >Events</h2>
                    <EventList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(EventPage);
