import React , {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PlusButton from './add-icon.svg';

const styles= {


}


function ChoiceInput(props){
  const {classes, choices, addChoice} = props;
  const [choice , setChoice] = useState('');

  const pushChoice = e =>{
   e.preventDefault(); 
    if(!choice){
      return;
    }
    addChoice([...choices , choice]);
    setChoice("");
  }


  return (
      <div className={classes.buttonContainer}>
        <form onSubmit={pushChoice}>
          <TextField
            id="outlined-name"
            label="choice"
            value={choice}
            onChange={event => setChoice(event.target.value)}
            margin="normal"
            variant="outlined"
            />
          <Button onClick={pushChoice}>
            <img src={PlusButton} />
          </Button>

          <List
            component="nav"
            subheader={<ListSubheader component="div">Choices</ListSubheader>}
          >
            {
              (choices || []).map((choiceItem , index)=>{
                return (
                  <ListItem button key={index} component="a">
                    {choiceItem}
                  </ListItem>
                )
              })
            }
          </List>
        </form>
          
        </div>
  )

}

export default withStyles(styles)(ChoiceInput);
