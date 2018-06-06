import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import UserEventList from './user_event_list';
import EventForm from './event_form';
import {logout} from '../actions/auth';
import './user_page.css';

// import RegistrationForm from './registration_form';

export class UserPage extends React.Component {

    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/user" />;//Events or Userpage
        }
        return (
            <div className="userHome">
                
                <div className="userHeaderDiv">
                    <Link className="eventLink" to="/events">Events</Link>
                    <Link className="userLogoutLink" onClick={() => this.logOut()} to="/" >Logout</Link>
                </div>
                <h2>My Events</h2>
                <UserEventList />
                <EventForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(UserPage);
