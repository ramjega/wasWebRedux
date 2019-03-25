import React from 'react';
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import * as WorkerActions from "../../worker/actions";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import RecipeReviewCard from "../../worker/components/WorkerCard";
import LinearIndeterminate from '../../common/components/LineLoadingBar'
import TemporaryDrawer from '../../common/components/TemporaryDrawer'

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
    const {workers, fetchState} = this.props.workerReducer;

    return (

      <div className="container-fluid">
        <br/>
        {fetchState === 1 &&
        <LinearIndeterminate/>
        }
        <center><h1>Home page</h1></center>
        {fetchState === 2 &&
        <TemporaryDrawer/>
        }
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

