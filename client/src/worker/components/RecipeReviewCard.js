import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: 50
  },
  button: {
    margin: theme.spacing.unit,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  handleExpandClick() {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    const {classes, worker} = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader={worker.job}
        />
        <CardMedia
          className={classes.media}
          image="https://www.wiscboneandjoint.com/wp-content/uploads/2014/08/WBJ_WorkerComp_Slider_Option-2_Backup-Image.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {worker.notes}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon/>
          </IconButton>
          <Button variant="contained" color="primary" className={classes.button}>
            Hire
          </Button>
          <IconButton
            className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick.bind(this)}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <div className='col-sm-12'>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Experience - {worker.experience}
              </Typography>
              <Typography paragraph>
               Payment - {worker.paymentInfo}
              </Typography>
              <Typography paragraph>
                {worker.notes}
              </Typography>
              <Typography paragraph>
                Rating {worker.rating}
              </Typography>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  worker: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
