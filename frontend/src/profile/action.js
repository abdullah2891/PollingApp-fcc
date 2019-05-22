import {
    FETCHED_PROFILE    
} from './types';

export function getProfile() {
    return dispatch => {
        fetch('/api/profile',
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
            })
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: FETCHED_PROFILE,
                    data: response.profile
                });
            });
            
    }
}
