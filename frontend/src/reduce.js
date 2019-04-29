import { combineReducers } from 'redux';
import {action:pollAction , reduce: pollReducer}  from './poll';

export default combineReducers({
  pollReducer
});


export const actions = {
  poll : pollAction
}
