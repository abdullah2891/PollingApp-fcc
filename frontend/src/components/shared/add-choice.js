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
import AddIcon from '@material-ui/icons/Add';


const styles= {
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }

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
      <div>
        <form onSubmit={pushChoice}>
          <div className={classes.buttonContainer}>
            <TextField
              id="outlined-name"
              label="choice"
              value={choice}
              onChange={event => setChoice(event.target.value)}
              margin="normal"
              variant="outlined"
              />
            <Button onClick={pushChoice}>
              <AddIcon />
            </Button>
          </div>

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
