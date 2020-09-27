import * as actionTypes       from './actionTypes';
import data from '../mockData';

export const fetchPollSuccess = ( poll ) => {
    return {
        type: actionTypes.FETCH_POLL_SUCCESS,
        poll: poll
    };
};

export const fetchPollFail = ( error ) => {
    return {
        type: actionTypes.FETCH_POLL_FAIL,
        error: error
    };
};

export const fetchPollStart = () => {
    return {
        type: actionTypes.FETCH_POLL_START
    };
};

export const fetchPoll = () => {
    return dispatch => {
        dispatch(fetchPollStart());
        const poll = data.poll;
        if (poll){
          dispatch(fetchPollSuccess(poll))
        }
        else {
          dispatch(fetchPollFail('error'))
        };
    };
};
