import React from 'react';
import { nFormatter } from '../Utils/nFormatter';
import { Grid, makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container, Row, Col } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import { BiHeart, BiComment, BiShare } from "react-icons/bi";
import { FiEye } from "react-icons/fi";

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 400,
    backgroundColor: "inherit", /* #242526, 0e0e10, 282a2e */
    color: "inherit",
    border: "none", 
    boxShadow: "none",
    // '&:hover': {
    //   background: "#212121", /* #313335 */
    // },
    // borderRadius: 5,
    // border: '1px groove #1e1e10', /* #626567 */
    // fontSize: 'small',
  },
  
  hoverableDiv: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  
  mediaGrid: {
    flex: 1,
    // marginLeft: 100,
    width: '100%',
    borderRadius: 5,
    // opacity: '90%',
    border: '1px groove #404040',
    '&:hover': {
      cursor: 'pointer',
      filter: `brightness(110%)`,
      // opacity: '100%',
    },
  },

  title: {
    color: 'inherit',
    wordBreak: "break-word",
    '&:hover': {
      textDecoration: 'underline',
    },    
  },

  subjectGrid: {
    wordWrap: "break-word",
    fontSize: 'small',
    '&:hover': {
      filter: `brightness(110%)`,
    },
  },
  
  iconButton: {
    color: "inherit",
    // width: 40,
    // height: 50,
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      backgroundColor: 'transparent',
   },
  },
  
  countNum : {
    marginLeft: '.2rem',
    fontSize: 'small',
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


export default function GridThreadCard(props) {
  const classes = useStyles(props);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const handleThreadClick = () => {
    console.log(`clicked Thread -> ${props.id}`);
  };

  const handleImageClick = () => {
    openInNewTab(`${props.image}`); 
  };
  
  return (
    <Card className={classes.root}>
      <div onClick={handleThreadClick} className={classes.hoverableDiv}>
        {props.image ? 
          <CardMedia
            className={classes.mediaGrid}
            component="img"
            onClick={(e) => {e.stopPropagation(); handleImageClick()}}
            src={props.image ? props.image : null}
            title={props.fileName ? props.fileName : null}
          />
          // <img src={props.image} alt='' className={classes.media}/>
        : null} 

        <div styles={{ width: '10'}}>
          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid>
              <IconButton 
                size='small' 
                aria-label="Like" 
                disableRipple 
                className={`${classes.iconButton} ${classes.likeButton}`}
              >
                <BiHeart/>
                <Typography variant="body2" className={classes.countNum}>
                  {props.likesCount ? nFormatter(props.likesCount, 1) : '0'}
                </Typography>                 
              </IconButton>
            </Grid>
            <Grid>
              <IconButton 
                size='small' 
                aria-label="Post" 
                disableRipple 
                className={`${classes.iconButton} ${classes.postButton}`}
              >
                <BiComment/>
                <Typography variant="body2" className={classes.countNum}>
                  {props.postsCount ? nFormatter(props.postsCount, 1) :  '0'}
                </Typography>
              </IconButton>         
            </Grid>
            <Grid>
              <IconButton 
                size='small'
                aria-label="Share"
                disableRipple 
                className={`${classes.iconButton} ${classes.shareButton}`}
                >
                  <BiShare/>
                  <Typography variant="body2" className={classes.countNum}>
                    {props.sharesCount ? nFormatter(props.sharesCount, 1) :  '0'}
                  </Typography>
                </IconButton>   
            </Grid>
            <Grid>
              <IconButton 
                size='small' 
                aria-label="Views" 
                disableRipple 
                className={`${classes.iconButton} ${classes.viewsButton}`}
              >
                <FiEye/>
                <Typography variant="body2" className={classes.countNum}>
                  {props.viewsCount ? nFormatter(props.viewsCount, 1) :  '0'}
                </Typography>
              </IconButton>    
            </Grid>
          </Grid>
        </div>

        <CardContent>
          <Typography 
            paragraph 
            variant="body2" 
            component="p" 
            className={classes.subjectGrid}
          >
            {props.subject ? props.subject : null} 
          </Typography>
        </CardContent>

      </div>
    </Card>
  );
}
