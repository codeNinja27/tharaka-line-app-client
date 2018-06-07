import React from 'react';
import {connect} from 'react-redux';
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
                    <li className="userEventListItem" key={index}>
                        <span className="userTitleSpan" >{singleEvent.title}</span>
                        <span className="userHoursSpan" >{singleEvent.hours}</span>
                        <span className="userPaySpan" >${singleEvent.pay}</span>
            
                        <button className="removeButton" onClick={ () => { this.onEventRemoveClick(singleEvent)} }>Remove</button>
                    </li> 
    
                return item;
            });

            acceptedEventsJsx = accpetedEvents.map((singleEvent, index) => {
                const item =  
                    <li className="userEventListItem" key={index}>
                        <span className="userTitleSpan" >{singleEvent.title}</span>
                        <span className="userHoursSpan" >{singleEvent.hours}</span>
                        <span className="userPaySpan" >${singleEvent.pay}</span>
                    </li> 
    
                return item;
            });
    
        }
    

        return (
            <div className="userEventList">
                <div className="userPostedEvents">
                    <h3>My Posted Events</h3>
                    <ul className="userPostedUl" >
                        <li>
                            <span className="userMainTitle" >Title</span>
                            <span className="userMainHours" >Hours</span>
                            <span className="userMainPay" >Pay</span>
                            <span className="userMainStatus" >Status</span>
                        </li>
                        {ownedEventsJsx} 
                    </ul>
                </div>
                <div className="userAcceptedEvents">
                    <h3>My Accepted Events</h3>
                    <ul className="userAcceptedUl" >
                        <li>
                            <span className="userMainTitle" >Title</span>
                            <span className="userMainHours" >Hours</span>
                            <span className="userMainPay" >Pay</span>
                        </li>
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

