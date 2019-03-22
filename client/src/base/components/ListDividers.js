import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Auth from '../../modules/Auth';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

function ListDividers(props) {
  const {classes, userName} = props;
  return (
    <div>
      {!Auth.isUserAuthenticated() ?
        <List component="nav" className={classes.root}>
          <Link to="/signUp">
            <ListItem button>
              <ListItemText primary="Sign Up"/>
            </ListItem>
          </Link>
          <Divider/>
          <Link to="/signIn">
            <ListItem button divider>
              <ListItemText primary="Sign In"/>
            </ListItem>
          </Link>
        </List>
        :
        <List component="nav" className={classes.root}>
          <Link to="/profile">
          <ListItem button>
            <ListItemText primary={userName}/>
          </ListItem>
          </Link>
          <Divider/>
          <Link to="/createWorker">
            <ListItem button divider>
              <ListItemText primary="Create Job"/>
            </ListItem>
          </Link>
          <Link to="/logout">
            <ListItem button divider>
              <ListItemText primary="Sign Out"/>
            </ListItem>
          </Link>
        </List>
      }
    </div>
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListDividers);
