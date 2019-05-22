import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from "react-redux";

import AppBar from './components/app-bar';
import PollListing from './components/polls/polls-listing.js';
import PollDetail  from './components/polls/poll-detail.js';
import PollAnalytics  from './components/polls/poll-analytics.js';
import CreatePoll  from './components/polls/create-poll.js';

import {actions} from './action-resolver';
import store from './store.js';

const styles= {
  container:{
    padding: "15px"
  }
}


function App(props) {
  const {fetching , polls ,profile} =  props;

  return (
    <div className="App">
      <AppBar 
        profile = {props.profile} 
      /> 
      <div style={styles.container}>
        <BrowserRouter>
          <Switch> 
            <Route exact path="/">
              <PollListing
                polls = {polls}
                fetching = {fetching}
                profile = {profile}
              />
            </Route>

            <Route path='/poll/:id' component={PollDetail} />
            <Route path='/create' component={CreatePoll} />
            <Route path='/analytics/:id' component={PollAnalytics} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}


const mapToProps =  state =>{
  return {
    polls: state.pollReducer.poll,
    fetching: state.pollReducer.fetching,
    profile: state.profileReducer.profile
  }
}

export default connect(mapToProps)(App);
