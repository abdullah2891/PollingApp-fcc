import {
  FETCHED_PROFILE
} from './types';


export default function reducer(state = {} ,action){
  const type = action.type; 
  switch(type){
    case FETCHED_PROFILE:
        return {...state, profile: action.data};
    default: 
          return state;
  }
}
