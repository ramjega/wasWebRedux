import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import * as WorkerActions from "../../worker/actions";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from "moment";
import Auth from "../../modules/Auth";

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

class CreateWorker extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    const field = event.target.name;
    const {workerRequest} = this.props.workerReducer;
    workerRequest[field] = event.target.value;
    this.props.setWorkerRequest(workerRequest);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const {workerRequest} = this.props.workerReducer;
    // create a string for an HTTP body message

    const job = encodeURIComponent(workerRequest.job);
    const experience = encodeURIComponent(workerRequest.experience);
    const paymentInfo = encodeURIComponent(workerRequest.paymentInfo);
    const mobileNumber = encodeURIComponent(workerRequest.mobileNumber);
    const notes = encodeURIComponent(workerRequest.notes);

    const userId = encodeURIComponent(Auth.getUser()._id);
    const status = encodeURIComponent("initial");
    const rating = encodeURIComponent("0");
    const createdTime = encodeURIComponent(moment().unix());


    const formData = `job=${job}&experience=${experience}&paymentInfo=${paymentInfo}&mobileNumber=${mobileNumber}&notes=${notes}`;
    const additionalData = `&userId=${userId}&status=${status}&rating=${rating}&createdTime=${createdTime}`;

    this.props.createWorker(formData+additionalData);
  }


  render() {

    const {classes} = this.props;
    const {workerRequest} = this.props.workerReducer;

    return (

      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddIcon/>
          </Avatar>
          <Typography component="h1" variant="h4">
            Job
          </Typography>

          <form className={classes.form} onSubmit={this.onFormSubmit}>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="job">Job</InputLabel>
                <Input  onChange={this.onInputChange} id="name" value={workerRequest.job} name="job"
                       autoComplete="User name" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="experience">Working Experience</InputLabel>
                <Input  onChange={this.onInputChange} id="experience" value={workerRequest.experience} name="experience"
                        autoComplete="Working Experience" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="paymentInfo">Payment Information</InputLabel>
                <Input onChange={this.onInputChange} name="paymentInfo" id="paymentInfo" value={workerRequest.paymentInfo}
                       autoComplete="Payment Information" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
              <Input  onChange={this.onInputChange} name="mobileNumber" id="mobileNumber" type="number"  value={workerRequest.mobileNumber}
                     autoComplete="Mobile Number" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="notes">Notes</InputLabel>
              <Input onChange={this.onInputChange} name="notes" id="notes" value={workerRequest.notes}
                     autoComplete="Notes" autoFocus/>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </Paper>
      </main>
    )

  }

}

CreateWorker.contextTypes = {
  router: PropTypes.object.isRequired,
};

CreateWorker.propTypes = {
  classes: PropTypes.object.isRequired,
  workerReducer: PropTypes.object.isRequired,
  setWorkerRequest: PropTypes.func.isRequired,
  createWorker: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    workerReducer: state.workerReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WorkerActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CreateWorker))

