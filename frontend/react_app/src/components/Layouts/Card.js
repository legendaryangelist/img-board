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
import { BiHeart, BiComment, BiShare } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Container, Row, Col } from "react-bootstrap";
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 625,
    backgroundColor: "#0e0e10", /* #242526 */
    color: "inherit",
    '&:hover': {
      background: "#242526", /* #313335 */
    },
    borderRadius: 5,
    border: '1px groove #626567', /* #626567 */
  },

  header: {
    wordWrap: "break-word",
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    // backgroundColor: '#228B22',
    width: '38px',
    height: '38px',
  },

  title: {
    color: 'inherit',
    wordWrap: "break-word"
  },

  subheader: {
    color: '#A0A0A0',
    '&:hover': {
      color: '#B0B0B0',
   },
  },

  divider: {
    background: '#626567',
  },

  button: {
    display: 'block',
    textAlign: 'initial'
  },

  iconButton: {
    color: "inherit",
    width: 55,
    height: 55,
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      backgroundColor: 'transparent',
   },
  },

  likeButton: {
    '&:hover': {
      color: '#ff1a1a',
   },
  },

  postButton: {
    '&:hover': {
      color: '#27ae60',
   },
  },

  shareButton: {
    '&:hover': {
      color: '#5dade2',
   },
  },

  viewsButton: {
    '&:hover': {
      color: '#f7dc6f',
   },
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

  const handleViewsClick = () => {
    // TODO: fill in
  };
  
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}
        avatar={
          <Avatar 
          aria-label="Creator" 
          src={process.env.PUBLIC_URL + '/defAvatar.jpg'}
          className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="body1" component="p" className={classes.title}>
            {props.subject ? props.subject : null}
          </Typography>         
        }
        subheader={
          <Typography variant="body2" className={classes.subheader}>
            {props.created ? props.created : null}
          </Typography>          
        }
      />
      
      <CardContent>
        <Typography paragraph variant="body2" component="p" /*style={{ wordWrap: "break-word" }}*/>
          {props.text ? props.text : null}
        </Typography>
      </CardContent>

      {props.thumbnail ? 
        <CardMedia
          className={classes.media}
          component="img"
          image={props.thumbnail ? props.thumbnail : null}
          title={props.fileName ? props.fileName : null}
        />
      : null} 

      <Divider style={{ background: '#303030' }} variant="middle" />  

      <div disableSpacing>
        <Container fluid>
          <Row className="justify-content-md-center" style={{ marginLeft: "60px"}}>
            <Col>
              <IconButton 
                size='small' 
                aria-label="Like" 
                disableRipple 
                onClick={() => handleLikeClick}
                className={`${classes.iconButton} ${classes.likeButton}`}
              >
                <BiHeart/>
              </IconButton>
            </Col>
            <Col>
              <IconButton 
                size='small' 
                aria-label="Post" 
                disableRipple 
                onClick={() => handlePostClick}
                className={`${classes.iconButton} ${classes.postButton}`}
              >
                <BiComment/>
              </IconButton>
            </Col>
            <Col>
              <IconButton 
               size='small'
               aria-label="Share"
               disableRipple 
               onClick={() => handleShareClick}
               className={`${classes.iconButton} ${classes.shareButton}`}
              >
                <BiShare/>
              </IconButton>
            </Col>
            <Col>
              <IconButton 
                size='small' 
                aria-label="Views" 
                disableRipple 
                onClick={() => handleViewsClick}
                className={`${classes.iconButton} ${classes.viewsButton}`}
              >
                <FiEye/>
              </IconButton>
            </Col>
          </Row>
        </Container> 
      </div>
      
    </Card>
  );
}
