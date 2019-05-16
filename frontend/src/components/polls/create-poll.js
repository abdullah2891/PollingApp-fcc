import React,{useState} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {actions} from '../../action-resolver';
import store from '../../store.js';
import ChoiceInput from '../shared/add-choice';

const styles = {
  container:{
    marginLeft: "30vw",
    marginTop: "20vh",
    maxWidth: "30vw"
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}



function CreatePoll(props){
  const {classes} = props;
  const [question,setQuestion] = useState(''); 
  const [choices, addChoice] = useState([]);

  return (
    <form className={classes.container} onSubmit={onSubmit.bind(this,question, choices)} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Question"
          value={question}
          onChange={event => setQuestion(event.target.value)}
          margin="normal"
          variant="outlined"
        />
        <ChoiceInput
          choices = {choices} 
          addChoice = {addChoice}
        /> 
        <Button
            onClick={onSubmit.bind(this,question, choices)}
        >
          Create Poll
        </Button>
    </form>
  )
}

function onSubmit(question, choices){
  console.log(question , choices)
  store.dispatch(actions.pollAction.createPoll(question, choices));
}



export default withStyles(styles)(CreatePoll);
