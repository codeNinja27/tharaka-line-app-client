import { SET_EVENTS, SET_USER_EVENTS, CREATE_EVENT_SUCCESS, REMOVE_EVENT_SUCCESS, UPDATED_EVENT_SUCCESS } from '../actions/events';


const initialState = {
    events: [],
    userEvents: []
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_EVENTS) {
        return Object.assign({}, state, {
            events: action.events
        });
    } else if(action.type === SET_USER_EVENTS) {
        return Object.assign({}, state, {
            userEvents: action.userEvents
        });
    } else if(action.type === CREATE_EVENT_SUCCESS) {
        return Object.assign({}, state, {
            userEvents: [...state.userEvents, action.newEvent]
        });
    } else if(action.type === REMOVE_EVENT_SUCCESS) {
        return Object.assign({}, state, {
            userEvents: state.userEvents.filter(event => action.eventId !== event._id)
        });
    } else if(action.type === UPDATED_EVENT_SUCCESS) {
        let eventId = action.updatedEvent._id;
        let eventIndex;
        let eventsCopy = state.events.slice();
        eventsCopy.forEach((event, index) => {
            if(event._id === eventId) {
                eventIndex = index;
            } 
        });
        eventsCopy[eventIndex] = action.updatedEvent;
        
        return Object.assign({}, state, {
            events: eventsCopy
        });
    } 
    return state;
}
