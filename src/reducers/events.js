import { SET_EVENTS, SET_USER_EVENTS, CREATE_EVENT_SUCCESS, REMOVE_EVENT_SUCCESS } from '../actions/events';


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
    }
    return state;
}
