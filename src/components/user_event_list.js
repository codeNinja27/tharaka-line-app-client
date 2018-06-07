import React from 'react';
import {connect} from 'react-redux';
// import {Link, Redirect} from 'react-router-dom';
import { getUserEvents } from '../actions/events';
import {removeEvents} from '../actions/events';
import './user_event_list.css';

export class UserEventList extends React.Component {
  
    componentDidMount() {
        this.props.dispatch(getUserEvents());
    }

    onEventRemoveClick(values) {
        return this.props.dispatch(removeEvents(values._id));
    }

    render() {
        let ownedEvents, accpetedEvents, ownedEventsJsx, acceptedEventsJsx
        if (this.props.loggedIn) {
            ownedEvents = this.props.userEvents.filter((event) => {
                return event.userId === this.props.currentUser._id;
            });
            accpetedEvents = this.props.userEvents.filter((event) => {
                return event.userId !== this.props.currentUser._id;
            });
    
            ownedEventsJsx = ownedEvents.map((singleEvent, index) => {
                const item =  
                    <li key={index}>
                        <span>Title: {singleEvent.title}</span>
                        <span>Hours: {singleEvent.hours}</span>
                        <span>Pay: {singleEvent.pay}</span>
            
                        <button onClick={ () => { this.onEventRemoveClick(singleEvent)} }>Remove</button>
                    </li> 
    
                return item;
            });

            acceptedEventsJsx = accpetedEvents.map((singleEvent, index) => {//Add remove function here to accpt too but this will only change the acceptUserId to null
                const item =  
                    <li key={index}>
                        <span>Title: {singleEvent.title}</span>
                        <span>Hours: {singleEvent.hours}</span>
                        <span>Pay: {singleEvent.pay}</span>
                    </li> 
    
                return item;
            });
    
        }
        // const ownedEvents = this.props.userEvents.filter((event) => {
        //     return event.userId === this.props.currentUser._id;
        // });
        // const accpetedEvents = this.props.userEvents.filter((event) => {
        //     return event.userId !== this.props.currentUser._id;
        // });

        // const ownedEventsJsx = ownedEvents.map((singleEvent, index) => {
        //     const item =  
        //         <li key={index}>
        //             <span>title: {singleEvent.title}</span>
        //             <span>hours: {singleEvent.hours}</span>
        //             <span>pay: {singleEvent.pay}</span>
        
        //             <button onClick={ () => { this.onEventRemoveClick(singleEvent)} }>Remove</button>
        //         </li> 

        //     return item;
        // });

        // const acceptedEventsJsx = accpetedEvents.map((singleEvent, index) => {//Add remove function here to accpt too but this will only change the acceptUserId to null
        //     const item =  
        //         <li key={index}>
        //             <span>title: {singleEvent.title}</span>
        //             <span>hours: {singleEvent.hours}</span>
        //             <span>pay: {singleEvent.pay}</span>
        //         </li> 

        //     return item;
        // });

        return (
            <div className="userEventList">
                <div className="userPostedEvents">
                    <h3>My Posted Events</h3>
                    <ul>
                        {ownedEventsJsx} 
                    </ul>
                </div>
                <div className="userAcceptedEvents">
                    <h3>My Accepted Events</h3>
                    <ul>
                        {acceptedEventsJsx} 
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    userEvents: state.event.userEvents,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(UserEventList);

