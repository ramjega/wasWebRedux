import React from 'react';
import PropTypes from 'prop-types'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import * as AppointmentActions from "../../appointment/actions";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from "moment";
import Auth from "../../modules/Auth";
import {browserHistory} from "react-router";
import CircularIndeterminate from "../../common/components/CircularProgressBar";

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

class CreateAppointment extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appointmentReducer.mutateState === 1 && nextProps.appointmentReducer.mutateState === 2) {
      browserHistory.push("/");
      this.props.clearRequest();
    }
  }

  onInputChange(event) {
    const field = event.target.name;
    const {appointmentRequest} = this.props.appointmentReducer;
    appointmentRequest[field] = event.target.value;
    this.props.setAppointmentRequest(appointmentRequest);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const {appointmentRequest} = this.props.appointmentReducer;
    // create a string for an HTTP body message

    const appointmentDate = encodeURIComponent(appointmentRequest.appointmentDate);
    const appointmentTime = encodeURIComponent(appointmentRequest.appointmentTime);
    const mobileNumber = encodeURIComponent(appointmentRequest.mobileNumber);
    const address = encodeURIComponent(appointmentRequest.address);
    const task = encodeURIComponent(appointmentRequest.task);
    const taskNotes = encodeURIComponent(appointmentRequest.taskNotes);

    const userId = encodeURIComponent(Auth.getUser()._id);
    const workerId = encodeURIComponent(appointmentRequest.worker._id);
    const status = encodeURIComponent("pending");
    const createdTime = encodeURIComponent(moment().unix());


    const formData = `appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&mobileNumber=${mobileNumber}&address=${address}&task=${task}&taskNotes=${taskNotes}`;
    const additionalData = `&userId=${userId}&workerId=${workerId}&status=${status}&createdTime=${createdTime}`;

    this.props.createAppointment(formData + additionalData);
  }


  render() {

    const {classes} = this.props;
    const {appointmentRequest, mutateState} = this.props.appointmentReducer;

    return (

      <main className={classes.main}>
        <br/>
        <CssBaseline/>
        <Paper className={classes.paper}>
          {mutateState === 1 ?
            <CircularIndeterminate/>
            :
            < Avatar className={classes.avatar}>
              <AddIcon/>
            </Avatar>
          }

          <Typography component="h1" variant="h4">
            Appointment
          </Typography>

          <form className={classes.form} onSubmit={this.onFormSubmit}>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="task">Hire for</InputLabel>
              <Input onChange={this.onInputChange} id="task" value={appointmentRequest.task} name="task"
                     autoComplete="Hire for" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="taskNotes">Description</InputLabel>
              <Input onChange={this.onInputChange} id="taskNotes" name="taskNotes" value={appointmentRequest.taskNotes}
                     autoComplete="Description" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="paymentInfo">Address</InputLabel>
              <Input onChange={this.onInputChange} name="address" id="address" value={appointmentRequest.address}
                     autoComplete="Address" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
              <Input onChange={this.onInputChange} name="mobileNumber" id="mobileNumber" type="number"
                     value={appointmentRequest.mobileNumber}
                     autoComplete="Mobile Number" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="notes">Appointment Date</InputLabel>
              <Input onChange={this.onInputChange} name="appointmentDate" id="appointmentDate"
                     value={appointmentRequest.appointmentDate}
                     autoComplete="Notes" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="appointmentTime">Appointment Time</InputLabel>
              <Input onChange={this.onInputChange} name="appointmentTime" id="appointmentTime"
                     value={appointmentRequest.appointmentTime}
                     autoComplete="Appointment Time" autoFocus/>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Appointment
            </Button>
          </form>
        </Paper>
      </main>
    )

  }

}

CreateAppointment.contextTypes = {
  router: PropTypes.object.isRequired,
};

CreateAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentReducer: PropTypes.object.isRequired,
  setAppointmentRequest: PropTypes.func.isRequired,
  createAppointment: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    appointmentReducer: state.appointmentReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppointmentActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CreateAppointment))

