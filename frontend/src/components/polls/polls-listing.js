import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import PollIcon from '@material-ui/icons/Poll';
import Button from '@material-ui/core/Button';

import Loading from '../loading.js';


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  createPollContainer: {
    position: 'absoulte',
    float: 'right',
    top: "10vh",
    left: "10vw"
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


function PollListing(props){
  const {fetching, polls, classes} = props;
  console.log(props)
  return(
      <div>
        <Button className={classes.createPollContainer}  href="/create-poll">
          Create Poll
        </Button>

        {!fetching ?
         (<List
            component="nav"
            subheader={<ListSubheader component="div">Survey</ListSubheader>}
            className={classes.root}
          >
                    
          {(polls|| []).map((poll,index)=>
            (<ListItemLink key={index} href={`poll/${poll._id}`}  key={index}button>
              <ListItemIcon>
                <PollIcon /> 
              </ListItemIcon>
              <ListItemText inset primary={poll.question} />
            </ListItemLink>)
          )
          }
          </List>)
          :
          (<Loading />)
        }
      </div>
  )

}



export default withStyles(styles)(PollListing);
