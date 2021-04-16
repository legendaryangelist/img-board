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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
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
  const [expanded, setExpanded] = React.useState(false);

  const handleCardClick = () => {

  };
  
  return (
    <ButtonBase onClick={handleCardClick} className={classes.cardAction} >
    <Card className={classes.root}>
      
      <CardHeader
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
        title={props.subject ? props.subject : null}
        subheader={props.created ? props.created : null}
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
        <Typography paragraph variant="body2" component="p">
          {props.text ? props.text : null}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <Container fluid>
          <Row className="justify-content-md-center">
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
    </ButtonBase>
  );
}
