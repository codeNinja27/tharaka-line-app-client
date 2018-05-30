import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

// import HeaderBar from './header-bar';
import Main from './main_page';
import Userpage from './user_page';
import RegistrationPage from './registration_page';
import {refreshAuthToken, clearAuth} from '../actions/auth';


export class App extends React.Component {
    componentDidUpdate(prevProps) {

        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically

            this.startPeriodicRefresh();

            setTimeout(() => {
                alert('Loging out soon')
            }, 60 * 1000 * 4)

        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }

    }


    
    componentDidMount() {


        setTimeout(() => {
            this.props.dispatch(clearAuth())
        }, 60 * 1000 * 5)
    }

    componentWillUnmount() {//AutoLogout here?
        this.stopPeriodicRefresh();

    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            // 60 * 60 * 1000 // One hour
            10 * 60 * 1000 // Ten minutes
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                {/* <HeaderBar /> */}
                <Route exact path="/" component={Main} />
                <Route exact path="/user" component={Userpage} />
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

