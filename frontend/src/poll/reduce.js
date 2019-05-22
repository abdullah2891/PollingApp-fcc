import {
    GET_POLL,
    FETCHING_POLL,
    FETCHED_POLL,
    ERROR_POLL,
    CAST_VOTE,
    CASTING_VOTE,
    CREATING_POLL,
    CREATE_POLL,
    SET_QUESTION,
    ADD_CHOICE,
    CLEAR_ALL,
    DELETE_POLL
} from './types';


export default function reducer(state = {} ,action){
  const type = action.type;

  switch(type){
    case GET_POLL:
      return {...state ,fetching: true}
    case FETCHED_POLL:
        return {...state,  fetching: false , poll: action.data};
    case ERROR_POLL:
          return  { ...state , fetching: false, deletingPoll: false, castingVote: false , error: action.error};
    case CASTING_VOTE:
      return {...state ,castingVote: true}
    case CAST_VOTE:
        return {...state, castingVote: false, cast: action.data}; 
    case CREATING_POLL:
        return {...state, creatingPoll: true};
    case CREATE_POLL:
        return {...state, create: action.data ,creatingPoll: false};
    case DELETE_POLL:
        return {...state, poll: state.poll.filter(p => p._id !== action.id)};
    default: 
          return state;
  }
}
