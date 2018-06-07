import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

// import HeaderBar from './header-bar';
import Main from './main_page';
import Userpage from './user_page';
import Events from './event_page';
import RegistrationPage from './registration_page';
import {refreshAuthToken, clearAuth} from '../actions/auth';


export class App extends React.Component {

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            10 * 60 * 1000 // Ten minutes
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }


    componentDidUpdate(prevProps) {
        
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically

            this.startPeriodicRefresh();

            setTimeout(() => {
                // return <div>Loging out soon</div>
                console.log('Loging out soon')
            }, 60 * 1000 * 15)

        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }

    }

    
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(clearAuth())
        }, 60 * 1000 * 20)
    }

    componentWillUnmount() {//AutoLogout here?
        this.stopPeriodicRefresh();

    }

    // startPeriodicRefresh() {
    //     this.refreshInterval = setInterval(
    //         () => this.props.dispatch(refreshAuthToken()),
    //         10 * 60 * 1000 // Ten minutes
    //     );
    // }

    // stopPeriodicRefresh() {
    //     if (!this.refreshInterval) {
    //         return;
    //     }

    //     clearInterval(this.refreshInterval);
    // }

    render() {
        // let UserpageRoute, EventsRoute
        // if(this.props.loggedIn) {
        //     UserpageRoute = <Route exact path="/user" component={Userpage} />;
        //     EventsRoute = <Route exact path="/events" component={Events} />;
        // } else {
        //     UserpageRoute =  <Route exact path="/user"  component={Main} />
        //     EventsRoute = <Route exact path="/events" component={Main} />
        // }
        return (
            <div className="app">
                <Route exact path="/" component={Main} />
                {/* {UserpageRoute}
                {EventsRoute} */}
                <Route exact path="/user" component={Userpage} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));

