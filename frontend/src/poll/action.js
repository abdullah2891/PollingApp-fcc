import {
    GET_POLL,
    FETCHING_POLL,
    FETCHED_POLL,
    ERROR_POLL,
    CAST_VOTE,
    CASTING_VOTE,
    CREATE_POLL, 
    CREATING_POLL,
    SET_QUESTION,
    ADD_CHOICE,
    CLEAR_ALL,
    DELETING_POLL,
    DELETE_POLL
} from './types';

export function getPoll() {
    return dispatch => {

        dispatch({
            type: GET_POLL
        });

        fetch('/api/poll',
            {
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
                    type: FETCHED_POLL,
                    data: response.polls
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


export function castVote(choiceID){
    return dispatch =>{
        console.log("castvote")
        dispatch({
            type: CASTING_VOTE
        });

        fetch('/api/vote/cast',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({choiceID})
        })
        .then(response => response.json())
        .then(response =>{
            dispatch({
                type: CAST_VOTE,
                data: response
            });
        })
        .catch(error=>{
            dispatch({
                type: ERROR_POLL,
                error
            });
        });
    }

}

export function createPoll(question,choice){
    return dispatch => {
        dispatch({
            type: CREATING_POLL
        })


        fetch('api/poll', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({question,choice})
        })
            .then(response =>  response.json())
            .then(response =>{
                dispatch({
                    type: CREATE_POLL,
                    data: response
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR_POLL,
                    error
                });
            });;
    }

}


export function deletePoll(poll_id){
    return dispatch =>{
        fetch(`api/poll?id=${poll_id}`,{
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            }
        })
            .then(response =>  response.json)
            .then(() =>{
                dispatch({
                    type: DELETE_POLL,
                    id: poll_id
                });
            })
            .catch(error=>{
                dispatch({
                    type: ERROR_POLL,
                    error 
                })
            })

    }
}

