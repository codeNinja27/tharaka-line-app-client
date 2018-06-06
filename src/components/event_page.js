import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import EventList from './event_list';
import {logout} from '../actions/auth';

// import RegistrationForm from './registration_form';

export class EventPage extends React.Component {

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        //have a map function go through all the events and put it in li
        // if (this.props.loggedIn) {
        //     return <Redirect to="/user" />;//Events or Userpage
        // }
        return (
            <div className="userHome">
                <h2>Events</h2>
                <EventList />
                <Link to="/user">My Events</Link><br></br>
                <Link onClick={() => this.logOut()} to="/" >Logout</Link>
            </div>
        );
    }
}

// export function EventPage(props) {
//     // If we are logged in (which happens automatically when registration
//     // is successful) redirect to the user's dashboard
//     if (props.loggedIn) {
//         return <Redirect to="/user" />;//Events or Userpage
//     }
//     return (
//         <div className="userHome">
//             <h2>Events</h2>
//         </div>
//     );
// }

const mapStateToProps = state => ({
    // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(EventPage);
