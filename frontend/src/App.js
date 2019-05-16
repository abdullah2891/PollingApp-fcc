import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from "react-redux";

import AppBar from './components/app-bar';
import PollListing from './components/polls/polls-listing.js';
import PollDetail  from './components/polls/poll-detail.js';
import PollAnalytics  from './components/polls/poll-analytics.js';
import CreatePoll  from './components/polls/create-poll.js';

const styles= {
  container:{
    padding: "15px"
  }
}


function App(props) {
  const {fetching , polls} =  props;
  console.log({polls})
  return (
    <div className="App">
      <AppBar /> 
      <div style={styles.container}>
        <BrowserRouter>
          <Switch> 
            <Route exact path="/">
              <PollListing
                polls = {polls}
                fetching = {fetching}
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
    fetching: state.pollReducer.fetching
  }
}

export default connect(mapToProps)(App);
