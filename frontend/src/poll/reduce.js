import {GET_POLL , FETCHED_POLL , ERROR_POLL} from './types';


export default function reducer(state = {} ,action){
  const type = action.type;

  switch(type){
    
    case GET_POLL:
      return {...state ,fetching: true}
    case FETCHED_POLL:
        return {...state,  fetching: false , poll: action.data};
    case ERROR_POLL:
          return  { ...state , fetching: false, error: action.error};

    default: 
          return state;
  }
}
