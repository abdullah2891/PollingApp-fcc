import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {actions} from  '../../action-resolver';
import store from '../../store';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  card:{
    marginTop: "20vh",
    marginLeft: "30vw",
    maxWidth: "30vw"
  }
});

function PollDetail(props){
  const {id} = props.match.params || {};
  const {classes, polls} = props;
  const selectedPanel = (polls || []).find(poll => poll._id === id) || {};
  console.log(polls)

  return(
    <Card className={classes.card}>
      <CardContent>
      <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{selectedPanel.question}</FormLabel>
          <RadioGroup
            aria-label="Choices"
            name="Choices"
            className={classes.group}
            value={props.choice}
            onChange={handleChange.bind(this,id)}
          >
            {(selectedPanel.choice || []).map((choice,index) =>(
              <FormControlLabel key={index} value={choice._id}  control={<Radio />} label={choice.option} />
            ))}
           </RadioGroup>
        </FormControl>

        <CardActions>
          <Button href={`/analytics/${id}`} size="small">View Result</Button>
        </CardActions>
      </CardContent>
    </Card>
  )

}

function handleChange(id,event){
  const choiceId = event.target.value;
  store.dispatch(actions.pollAction.castVote(choiceId));
  return choiceId;
};

const matchToProps = state => {
 return{
  polls: state.pollReducer.poll   
 }

}


export default withStyles(styles)(connect(matchToProps)(PollDetail));
