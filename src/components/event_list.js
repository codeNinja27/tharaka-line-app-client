import React from 'react';
import {connect} from 'react-redux';
// import {Link, Redirect} from 'react-router-dom';
import { getEvents } from '../actions/events';
import {acceptUserEvents} from '../actions/events';
import './event_list.css';


export class EventList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getEvents());
    }

    onEventClick(values) {
         this.props.dispatch(acceptUserEvents(values.title, values.hours, values.pay, values._id, values.userId));
    }

    render() {

        // const events = this.props.event.events.map((singleEvent, index) => { //Wrong way to do it
        //    if(this.props.currentUser && singleEvent.userId) {
        //         if((singleEvent.acceptUserId === null || singleEvent.acceptUserId === undefined || singleEvent.acceptUserId === "") && (this.props.currentUser._id !== singleEvent.userId)) {
        //             const item =  
        //                 <div key={index}>
        //                     <li key={index}>
        //                         <span>title: {singleEvent.title}</span>
        //                         <span>hours: {singleEvent.hours}</span>
        //                         <span>pay: {singleEvent.pay}</span>
        //                     </li> 
        //                     {!singleEvent.acceptUserId && 
        //                         <button onClick={ () => { this.onEventClick(singleEvent)} }>Accept</button>
        //                     }
        //                 </div>;
        //             return item
        //         } else {
        //             const item =  
        //                 <div key={index}>
        //                     <li key={index}>
        //                         <span>title: {singleEvent.title}</span>
        //                         <span>hours: {singleEvent.hours}</span>
        //                         <span>pay: {singleEvent.pay}</span>
        //                     </li> 
        //                 </div>
        //             return item                
        //         }
        //    }

        // });
        const events = this.props.events.map((singleEvent, index) => {
            return (
                <li className="eventListItem" key={index}>
                    <span className="titleSpan" >{singleEvent.title}</span>
                    <span className="hoursSpan" >{singleEvent.hours}</span>
                    <span className="paySpan" >${singleEvent.pay}</span>
                    {(singleEvent.acceptUserId === "") && (singleEvent.userId !== this.props.currentUser._id) &&//instead of "" use null in the backend schema
                        <button className="acceptButton" onClick={ () => { this.onEventClick(singleEvent)} }>Accept</button>
                    }
                </li>         
            );
         });

        return (
            <div className="fullEventList">
                <ul className="eventUlList">
                    <li>
                        <span className="mainTitle" >Title</span>
                        <span className="mainHours" >Hours</span>
                        <span className="mainPay" >Pay</span>
                        <span className="mainStatus" >Status</span>
                    </li>
                    {events} 
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    events: state.event.events
});

export default connect(mapStateToProps)(EventList);

