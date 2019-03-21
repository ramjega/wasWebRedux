import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import * as SignUpActions from "../actions";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from "moment";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  link: {
    margin: theme.spacing.unit,
    color: '#3f51b5',
    fontSize: '10px',
  },
  text: {
    fontSize: '12px',

  }
});

class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    const field = event.target.name;
    const {signUpRequest} = this.props.authenticationReducer;
    signUpRequest[field] = event.target.value;
    this.props.setSignUpRequest(signUpRequest);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const {signUpRequest} = this.props.authenticationReducer;
    // create a string for an HTTP body message
    const name = encodeURIComponent(signUpRequest.name);
    const email = encodeURIComponent(signUpRequest.email);
    const password = encodeURIComponent(signUpRequest.password);
    const createdTime = encodeURIComponent(moment().unix());

    const formData = `name=${name}&email=${email}&password=${password}&createdTime=${createdTime}`;

    this.props.signUp(formData);
    this.props.clearRequest();
    this.props.clearSuccessAndErrors();
  }


  render() {

    const {classes} = this.props;
    const {signUpRequest, errors} = this.props.authenticationReducer;

    return (

      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>

          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <form className={classes.form} onSubmit={this.onFormSubmit}>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              {errors.name ?
                <Input error onChange={this.onInputChange} id="name" value={signUpRequest.name} name="name"
                       autoComplete="User name" autoFocus/> :
                <Input onChange={this.onInputChange} id="name" value={signUpRequest.name} name="name"
                       autoComplete="User name" autoFocus/>
              }
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              {errors.email ?
                <Input error onChange={this.onInputChange} id="email" value={signUpRequest.email} name="email"
                       autoComplete="email" autoFocus/> :
                <Input onChange={this.onInputChange} id="email" value={signUpRequest.email} name="email"
                       autoComplete="email" autoFocus/>
              }
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              {errors.password ?
                <Input error onChange={this.onInputChange} name="password" type="password" id="password"
                       value={signUpRequest.password}
                       autoComplete="current-password"/> :
                <Input onChange={this.onInputChange} name="password" type="password" id="password"
                       value={signUpRequest.password}
                       autoComplete="current-password"/>
              }
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>

          <br/>
          <Typography className={classes.text}>
            Already have an account ?
          </Typography>
          <Link to="/signIn" className={classes.link}>
            Sign In
          </Link>

        </Paper>
      </main>
    )

  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticationReducer: PropTypes.object.isRequired,
  setSignUpRequest: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
  clearSuccessAndErrors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticationReducer: state.authenticationReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignUpActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignUpPage))

