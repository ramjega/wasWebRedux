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
import * as WorkerActions from "../../worker/actions";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from "moment";
import Auth from "../../modules/Auth";
import RecipeReviewCard from "../../worker/components/RecipeReviewCard";

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

  },
});

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchWorkers();
  }

  render() {
    const {classes} = this.props;
    const {workers} = this.props.workerReducer;

    return (

      <div className="container-fluid">
        <center><h1>Home page</h1></center>
        <div className="col-sm-12">
          <div className="row">
            {
              workers.length !== 0 &&
              workers.map((worker, index) => {
                return (
                  <div className="col-sm-3" key={index}>
                    <RecipeReviewCard worker={worker} key={index}/>
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>
    )

  }

}

Home.contextTypes = {
  router: PropTypes.object.isRequired,
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  workerReducer: PropTypes.object.isRequired,
  fetchWorkers: PropTypes.func.isRequired,
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
)(withStyles(styles)(Home))

