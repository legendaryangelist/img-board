import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { BiHeart, BiComment, BiShareAlt } from "react-icons/bi";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Container, Row, Col } from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    backgroundColor: "#242526",
    color: theme.palette.primary.contrastText,
  },
  header: {
    wordWrap: "break-word",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: '#32CD32',
  },
  button: {
    display: 'block',
    textAlign: 'initial'
  },
  icon: {
    color: "inherit",
    width: 50,
    height: 50,
  },
}));


export default function ImageboardCard(props) {
  const classes = useStyles();

  const handleLikeClick = () => {
    // TODO: fill in
  };

  const handlePostClick = () => {
    // TODO: fill in
  };

  const handleShareClick = () => {
    // TODO: fill in
  };
  
  return (
    <Card className={classes.root}>
      
      <CardHeader className={classes.header}
        avatar={
          <Avatar aria-label="Creator" className={classes.avatar}>
            {props.creator ? props.creator.charAt(0) : 'A'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="body1" component="p" style={{ wordWrap: "break-word" }}>
            {props.subject ? props.subject : null}
          </Typography>         
        }
        subheader={
          <Typography variant="body2">
            {props.created ? props.created : null}
          </Typography>          
        }
      />
      
      {props.thumbnail ? 
        <CardMedia
          className={classes.media}
          component="img"
          image={props.thumbnail ? props.thumbnail : null}
          title={props.fileName ? props.fileName : null}
        />
      : null}
      
      <CardContent>
        <Typography paragraph variant="body2" component="p" /*style={{ wordWrap: "break-word" }}*/>
          {props.text ? props.text : null}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <Container fluid>
          <Row className="justify-content-md-center" style={{ marginLeft: "50px" }}>
            <Col>
              <IconButton aria-label="Like" className={classes.icon}>
                <BiHeart />
              </IconButton>
            </Col>
            <Col>
              <IconButton aria-label="Post" className={classes.icon}>
                <BiComment />
              </IconButton>
            </Col>
            <Col>
              <IconButton aria-label="Share" className={classes.icon}>
                <BiShareAlt />
              </IconButton>
            </Col>
          </Row>
        </Container> 
      </CardActions>
      
    </Card>
  );
}
