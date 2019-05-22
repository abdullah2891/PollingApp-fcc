import { combineReducers } from 'redux';
import {action:pollAction , reduce: pollReducer}  from './poll';
import {action:profileAction , reduce: profileReducer}  from './profile';

export default combineReducers({
  pollReducer,
  profileReducer
});


export const actions = {
  poll : pollAction,
  profile: profileAction
}
