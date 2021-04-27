import React, { useEffect } from "react";
import {AppBar, Toolbar, Typography, Button, 
        IconButton, InputBase, fade, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { RiGridFill, RiLayout2Fill } from "react-icons/ri";
import { FaClipboard } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { SiEthereum } from "react-icons/si";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from "@material-ui/icons/Menu";
import { Container, Row, Col } from "react-bootstrap";
import CheckWeb3 from "../Blockchain/Web3Utils";
import { lightTheme, darkTheme } from '../Themes/Theme';
import { fetchState, switchLayout } from "../../store/actions/app/appActions";
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  appbar: {
    zindex: 1, 
    backgroundColor: "#18181b"
  },

  logo: {
    color:'inherit',
    marginRight: theme.spacing(-1),
    // '&:hover': {
    //   opacity: '85%',
    // },
  },

  title: {
    flexGrow: 1,
    zIndex: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    '&:hover': {
      opacity: '85%',
    },
  },

  titleButton: {
    zIndex: 1,
    color:'inherit',
    fontSize: '18px',
    marginLeft: theme.spacing(-1),
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(40),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(25),
      width: '500px', /*auto*/
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '440px',
    },
  },

  button:{
    color: 'inherit',
  },

  loginButton: {
    color: 'inherit',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    textTransform: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '32px',
    marginRight: theme.spacing(1),
    // marginleft: theme.spacing(1),
  }, 
  
  tooltip: {
    
  },

  iconButton: {
    color: 'inherit',
    marginRight: theme.spacing(1),
    borderRadius: 0,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.10),
    },
  },

  avatar: {
    width: '38px',
    height: '38px',
    '&:hover': {
      opacity: '85%',
    },
  },
}));


export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchState());
  }, [dispatch]);

  // get layout
  const layout = useSelector((state) => { 
    if(state.app.layout)
      return state.app.layout;
    else
      return 'rows';
  });
  
  // set layout icon
  let layoutIcon;
  if(layout === 'rows'){
    layoutIcon = <RiGridFill />
  }
  else if (layout === 'grid'){
    layoutIcon = <RiLayout2Fill />
  }
  else{
    layoutIcon = <RiGridFill />
  }
  
  // handle layout change, rows or grid
  const handleGridLayout = (e) => {
    // e.preventDefault();
    switch(layout){
      case 'rows':
        return dispatch(switchLayout('grid'));
      case 'grid':
        return dispatch(switchLayout('rows'));
      default:
        return dispatch(switchLayout('rows'));
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" fixed='top' className={classes.appbar}>
        <Toolbar variant="dense">

          <IconButton
            edge="start"
            aria-label="Logo"
            disableRipple
            onClick={() => history.push("/")}
            className={classes.logo}
          >
            <img alt="shadder" height="22.5" src={process.env.PUBLIC_URL + "shatter.jpg"} />
          </IconButton>
          
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton 
              aria-label="Shadder"
              disableRipple 
              onClick={() => history.push("/")} 
              className={classes.titleButton}
            >            
                Shadder
            </IconButton>           
          </Typography>         

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // onChange={(e) => searchAll(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />      
          
          <Tooltip arrow title="Threads" placement="bottom" className={classes.tooltip}>
            <IconButton disableRipple onClick={() => history.push("/threads")} className={classes.iconButton}>
              <MdForum />
            </IconButton>
          </Tooltip>
          
          <Tooltip arrow title="Boards" placement="bottom" className={classes.tooltip}>
            <IconButton disableRipple onClick={() => history.push("/boards")} className={classes.iconButton}>
              <FaClipboard />
            </IconButton>     
          </Tooltip>
          
          <Tooltip arrow title="Switch Layout" placement="bottom" className={classes.tooltip}>
            <IconButton disableRipple onClick={handleGridLayout} className={classes.iconButton}>
              {layoutIcon}
            </IconButton>
          </Tooltip>

          <Tooltip arrow title="Connect Wallet" placement="bottom" className={classes.tooltip}>
            <IconButton disableRipple onClick={() => CheckWeb3()} className={classes.iconButton}>            
              <SiEthereum /> 
            </IconButton>        
          </Tooltip>

          {/* TODO: implement Sign Up */}
          {/* {props.isAuthenticated ? null
            : <Button disableRipple onClick={() => history.push("/sign_up")} className={classes.button}>
                Sign Up
              </Button>
          } */}
          
          {/* TODO: implement Password Update */}
          {/* {props.isAuthenticated ? (
            <Button disableRipple onClick={() => history.push("/password_update")} className={classes.button}>
              Update Password
            </Button>
          ) : null} */}

          {props.isAuthenticated ? (
            <Button variant="contained" onClick={() => props.logout()} className={classes.loginButton} >
              Logout
            </Button>
           ) : 
            <Button variant="contained" onClick={() => history.push("/login")} className={classes.loginButton}>
              Log In
            </Button>
          }

          <div>
            <Button disableRipple className={classes.button}>
              <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/defAvatar.jpg'}/>
            </Button>              
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
