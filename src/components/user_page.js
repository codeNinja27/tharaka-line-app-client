import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

// import RegistrationForm from './registration_form';

export function UserPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/user" />;//Events or Userpage
    }
    return (
        <div className="userHome">
            <h2>My Events</h2>
            <Link to="/events">Events</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(UserPage);
