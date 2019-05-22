import { combineReducers } from 'redux';
import {pollReducer}  from './poll';
import {profileReducer}  from './profile';

export default combineReducers({
  pollReducer,
  profileReducer
});
