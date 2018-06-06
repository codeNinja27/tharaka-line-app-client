import React from 'react';
import {connect} from 'react-redux';
// import {Link, Redirect} from 'react-router-dom';
import { getEvents } from '../actions/events';
import {acceptUserEvents} from '../actions/events';


export class EventList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getEvents());
    }

    onEventClick(values) {
        return this.props.dispatch(acceptUserEvents(values.title, values.hours, values.pay, values._id, values.userId));
    }

    render() {

        const events = this.props.event.events.map((singleEvent, index) => {
           if(this.props.currentUser && singleEvent.userId) {
                if((singleEvent.acceptUserId === null || singleEvent.acceptUserId === undefined || singleEvent.acceptUserId === "") && (this.props.currentUser._id !== singleEvent.userId)) {
                    const item =  
                    <div key={index}>
                        <li key={index}>
                            <span>title: {singleEvent.title}</span>
                            <span>hours: {singleEvent.hours}</span>
                            <span>pay: {singleEvent.pay}</span>
                        </li> 
                        <button onClick={ () => { this.onEventClick(singleEvent)} }>Accept</button>
                    </div>
                    return item
                } else {
                    const item =  
                    <div key={index}>
                        <li key={index}>
                            <span>title: {singleEvent.title}</span>
                            <span>hours: {singleEvent.hours}</span>
                            <span>pay: {singleEvent.pay}</span>
                        </li> 
                    </div>
                    return item                
                }
           }

        });

        return (
            <div className="userHome">
                <ul>
                    {events} 
                </ul>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    event: state.event
});

export default connect(mapStateToProps)(EventList);

