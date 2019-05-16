import React from 'react';
import {
  PieChart, Pie, Legend, Tooltip,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {actions} from  '../../action-resolver';
import store from '../../store';
import {connect} from 'react-redux';
import PollViz from './poll-viz';
import TwitterList from './twitter-list';


const styles={
  container:{
    padding: "15px"
  },
  content: {
    maxHeight: "80%",
    overflowY: 'auto' 
  }
}

function pollAnalytics(props){
  const {id} = props.match.params || {};
  const {classes , polls} = props;
  const selectedPoll = (polls || []).find(poll => poll._id === id) || {};
console.log(polls)
  return(
    <div className={classes.container}>
      <h1>{selectedPoll.question}</h1>
      <Grid className={classes.content} container spacing={7}>
          <Grid item xs={5}>
            <PollViz
              data = {selectedPoll.choice}
              nameKey = "option"
              dataKey = "vote"
            />
          </Grid>
          <Grid item xs={5}>
            <TwitterList
              twitterList= {selectedPoll.user}
            />
          </Grid>
      </Grid>
    </div>
  )
}

const matchToProps = state =>{
  return {
    polls: state.pollReducer.poll
  }
}

export default withStyles(styles)(connect(matchToProps)(pollAnalytics));
