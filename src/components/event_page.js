import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

// import RegistrationForm from './registration_form';

export class EventPage extends React.Component {

    render() {
        //have a map function go through all the events and put it in li
        // if (this.props.loggedIn) {
        //     return <Redirect to="/user" />;//Events or Userpage
        // }
        return (
            <div className="userHome">
                <h2>Events</h2>
                <Link to="/user">My Events</Link>
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
