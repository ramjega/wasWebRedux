import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Auth from '../../modules/Auth';
import ListDividers from "./ListDividers";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import InboxIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import Drawer from "@material-ui/core/Drawer/Drawer";

const styles = theme => ({
  root: {
    width: '100%',
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    height:25,
    width:25,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }


  handleProfileMenuOpen(event) {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose() {
    this.setState({anchorEl: null});
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen(event) {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };

  handleMobileMenuClose() {
    this.setState({mobileMoreAnchorEl: null});
  };

  toggleDrawer(side, open) {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const {anchorEl, mobileMoreAnchorEl} = this.state;
    const {classes} = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let user;
    if(Auth.isUserAuthenticated()) {
      user = Auth.getUser();
    }
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose.bind(this)}
      >
        <ListDividers userName={Auth.isUserAuthenticated() ? user.name : ''}/>

      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose.bind(this)}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon/>
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose.bind(this)}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen.bind(this)}>
          <IconButton color="inherit">
            <AccountCircle/>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer.bind(this,'left', true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <Link to="/" className={classes.title} style={{color: '#FFF'}}>
                WAS
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon/>
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen.bind(this)}
                color="inherit"
              >
                {Auth.isUserAuthenticated() ?
                  <Avatar sizes={"10px"} className={classes.orangeAvatar}>{user.name[0].toUpperCase()}</Avatar> :
                  <AccountCircle/>
                }
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen.bind(this)} color="inherit">
                <MoreIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
         <div>
           <div>
             <Drawer open={this.state.left} onClose={this.toggleDrawer.bind(this,'left', false)}>
               <div
                 tabIndex={0}
                 role="button"
                 onClick={this.toggleDrawer.bind(this,'left', false)}
                 onKeyDown={this.toggleDrawer.bind(this,'left', false)}
               >
                 {sideList}
               </div>
             </Drawer>
           </div>
         </div>

        {this.props.children}
      </div>


    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
