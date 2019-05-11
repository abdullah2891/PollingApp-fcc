import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AppBar from './components/app-bar';
import PollListing from './components/polls/polls-listing.js';

const styles= {
  container:{
    padding: "15px"
  }
}


function App() {
  return (
    <div className="App">
      <AppBar /> 
      <div style={styles.container}>
        <Router> 
          <Route path="/" component={PollListing} />
        </Router>
      </div>
    </div>
  );
}

export default App;
