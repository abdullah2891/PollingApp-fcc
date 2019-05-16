import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TwitterIcon from './twitter.png';

const styles = {
  root:{
    width:"50vw"
  }
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


function TwitterList(props){
  const {classes,twitterList} = props;
  return(
      <Card>
          <CardContent>
            <List
              component="nav"
              subheader={<ListSubheader component="div">User Voted</ListSubheader>}
              className={classes.root}
            >
            {(twitterList || []).map((userId, index)=>(
              <ListItemLink key={index} href={`https://twitter.com/${userId}`} target="_blank"  key={index}button>
                  <ListItemIcon>
                    <img src={TwitterIcon} height="30" width="30"/>
                  </ListItemIcon>
                  <ListItemText inset primary={userId} />
                </ListItemLink>
            ))}

          </List>
        </CardContent>
      </Card>

  )
}


export default withStyles(styles)(TwitterList);
