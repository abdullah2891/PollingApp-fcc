import axios from 'axios';
import {
    GET_POLL,
    FETCHING_POLL,
    FETCHED_POLL,
    ERROR_POLL
} from './types';

console.log({
    GET_POLL,
    FETCHING_POLL,
    FETCHED_POLL,
    ERROR_POLL
})
export function getPoll() {
    return dispatch => {

        dispatch({
            type: GET_POLL
        });

        fetch('/api/poll')
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: FETCHED_POLL,
                    data: response
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR_POLL,
                    error
                })

            });
    }
}
