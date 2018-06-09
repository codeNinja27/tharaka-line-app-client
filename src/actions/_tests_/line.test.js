import {
    SET_AUTH_TOKEN,
    setAuthToken,
    CLEAR_AUTH,
    clearAuth,
    AUTH_REQUEST,
    authRequest,
    AUTH_SUCCESS,
    authSuccess,
    AUTH_ERROR,
    authError,
    login,
    logout,
    refreshAuthToken
} from '../auth';

import {
    SET_EVENTS,
    setEvents,
    SET_USER_EVENTS,
    setUserEvents,
    CREATE_EVENT_SUCCESS,
    createEventSuccess,
    REMOVE_EVENT_SUCCESS,
    removeEventSuccess,
    UPDATED_EVENT_SUCCESS,
    updatedEventSuccess,
    getEvents,
    getUserEvents,
    postEvents,
    acceptUserEvents,
    removeEvents
} from '../events';

import {
    registerUser
} from '../users';

import {
    normalizeResponseErrors
} from '../utils';

import {API_BASE_URL} from '../../config';


describe('Line-App Actions', () => {

    describe('setAuthToken', () => {
        it('Should return the action SET_AUTH_TOKEN', () => {
            const authToken = "";
            const action = setAuthToken(authToken);
			expect(action.type).toEqual(SET_AUTH_TOKEN);
			expect(action.authToken).toEqual(authToken);
		});
    });

    describe('clearAuth', () => {
        it('Should return the action CLEAR_AUTH', () => {
            const action = clearAuth();
			expect(action.type).toEqual(CLEAR_AUTH);
		});
    });

    describe('authRequest', () => {
        it('Should return the action AUTH_REQUEST', () => {
            const action = authRequest();
			expect(action.type).toEqual(AUTH_REQUEST);
		});
    });

    describe('authSuccess', () => {
        it('Should return the action AUTH_SUCCESS', () => {
            const currentUser = "user name";
            const action = authSuccess(currentUser);
            expect(action.type).toEqual(AUTH_SUCCESS);
            expect(action.currentUser).toEqual(currentUser);
		});
    });

    describe('authError', () => {
        it('Should return the action AUTH_ERROR', () => {
            const err = "error message";
            const action = authError(err);
            expect(action.type).toEqual(AUTH_ERROR);
            expect(action.error).toEqual(err);
		});
    });

    describe('setEvents', () => {
        it('Should return the action SET_EVENTS', () => {
            const events = [];
            const action = setEvents(events);
            expect(action.type).toEqual(SET_EVENTS);
            expect(action.events).toEqual(events);
		});
    });

    describe('setUserEvents', () => {
        it('Should return the action SET_USER_EVENTS', () => {
            const userEvents = [];
            const action = setUserEvents(userEvents);
            expect(action.type).toEqual(SET_USER_EVENTS);
            expect(action.userEvents).toEqual(userEvents);
		});
    });

    describe('removeEventSuccess', () => {
        it('Should return the action REMOVE_EVENT_SUCCESS', () => {
            const eventId = "fakeId";
            const action = removeEventSuccess(eventId);
            expect(action.type).toEqual(REMOVE_EVENT_SUCCESS);
            expect(action.eventId).toEqual(eventId);
		});
    });

    
});