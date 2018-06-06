import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const SET_EVENTS = 'SET_EVENTS';
export const setEvents = events => ({
    type: SET_EVENTS,
    events
});

export const SET_USER_EVENTS = 'SET_USER_EVENTS';
export const setUserEvents = userEvents => ({
    type: SET_USER_EVENTS,
    userEvents
});

export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const createEventSuccess = newEvent => ({
    type: CREATE_EVENT_SUCCESS,
    newEvent
});

export const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS';//get the id of the event in reducer use filter to remove the element by id
export const removeEventSuccess = eventId => ({
    type: REMOVE_EVENT_SUCCESS,
    eventId
});

// export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
// export const updateEventSuccess = updateEvent => ({
//     type: UPDATE_EVENT_SUCCESS,
//     updateEvent
// });


//GET ALL EVENTS
export const getEvents = (event) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: {//set up authorization token
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(event)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(event => dispatch(setEvents(event)))//storing the events in the store
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

//GET USER EVENTS
export const getUserEvents = (event) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/user`, {
        method: 'GET',
        headers: {//set up authorization token
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(events => dispatch(setUserEvents(events)))//storing the events in the store
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};


 
//POST AN EVENT
export const postEvents = (title, hours, pay) => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            hours,
            pay
        })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(createEventSuccess(res.createEvent)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

//ACCEPT AND EVENT
    export const acceptUserEvents = (title, hours, pay, _id, userId) => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    const id = _id;
   
    // console.log(title, hours, pay, _id)
    return fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            hours,
            pay,
            userId,
        })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .then(updateEvent => dispatch(updateEventSuccess(updateEvent)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

//REMOVE AN EVENT
export const removeEvents = (_id) => (dispatch, getState) => {
    // console.log('DELETE')
    const authToken = getState().auth.authToken;
   
    const id = _id;

    return fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => dispatch(removeEventSuccess(id)))
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
    });

};
