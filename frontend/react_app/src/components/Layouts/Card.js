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


const useStyles = makeStyles({
  root: {
    width: props => props.width,
    height: props => props.height,
    backgroundColor: "#0e0e10", /* #242526, 0e0e10, 282a2e */
    color: "inherit",
    '&:hover': {
      background: "#242526", /* #313335 */
    },
    borderRadius: 5,
    border: '1px groove #626567', /* #626567 */
    // fontSize: 'medium',
  },
  
  hoverableDiv: {
    '&:hover': {
      cursor: 'pointer',
    },
  },

  header: {
    wordBreak: "break-word",
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    // backgroundColor: '#228B22',
    width: '38px',
    height: '38px',
    '&:hover': {
      opacity: '85%',
    },
  },

  title: {
    color: 'inherit',
    wordBreak: "break-word",
    '&:hover': {
      textDecoration: 'underline',
    },    
  },

  subheader: {
    color: '#cdd8f2',
    '&:hover': {
      opacity: '65%',
      color: '#bed2fb',
      textDecoration: 'underline',
   },
  },

  divider: {
    background: '#626567',
  },

  button: {
    display: 'block',
    textAlign: 'initial'
  },
  
  rowMargin: {
    marginLeft: "60px",
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
 
  moreButton: {
    '&:hover': {
      color: '#5dade2',
   },
  },

  likeButton: {
    '&:hover': {
      color: '#ff1a1a',
   },
  },

  postButton: {
    '&:hover': {
      color: '#5dade2',
   },
  },

  shareButton: {
    '&:hover': {
      color: '#27ae60',
   },
  },

  viewsButton: {
    '&:hover': {
      color: '#f7dc6f',
   },
  },
});


export default function ImageboardCard(props) {
  const classes = useStyles(props);
  
  const handleMoreClick = () => {
    // TODO: fill in
  };

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
      <div onClick={() => console.log(`clicked -> ${props.id}`)} className={classes.hoverableDiv}>
      <CardHeader className={classes.header}
        avatar={
          <Avatar 
          size='small'
          aria-label="Creator" 
          src={process.env.PUBLIC_URL + '/defAvatar.jpg'}
          className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton 
              aria-label="settings"
              disableRipple 
              onClick={() => handleMoreClick}
              className={`${classes.iconButton} ${classes.moreButton}`}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="body1" component="p" className={classes.title}>
            {/* {props.subject ? props.subject : null} */}
            {props.creator ? props.creator : "Anonymous"}
          </Typography>         
        }
        subheader={
          <Typography variant="body2" className={classes.subheader}>
            {props.created ? props.created : null}
          </Typography>          
        }
      />
      <CardContent>
        <Typography paragraph variant="body2" component="p" style={{ wordWrap: "break-word" }}>
          {props.subject ? props.subject : null} 
          {/* {props.text ? props.text : null} */}
        </Typography>
      </CardContent>
      
      </div>

      {props.thumbnail ? 
        <CardMedia
          className={classes.media}
          component="img"
          image={props.thumbnail ? props.thumbnail : null}
          title={props.fileName ? props.fileName : null}
        />
      : null} 

      <Divider style={{ background: '#303030' }} variant="middle" />  

      <div>
        <Container fluid>
          <Row className="justify-content-md-center" style={{ marginLeft: props.rowMargin}}>
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
