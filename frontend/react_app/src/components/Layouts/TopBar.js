import React from "react";
import {AppBar, Toolbar, Typography, Button, 
        IconButton, InputBase, fade, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { BiComment } from "react-icons/bi";
import { MdForum, MdLocalGroceryStore } from "react-icons/md";
import { SiEthereum } from "react-icons/si";
import { useHistory } from "react-router-dom";
import MidBar from "./MidBar";
import { useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from "@material-ui/icons/Menu";
import CheckWeb3 from "../Blockchain/Web3Utils";
import { lightTheme, darkTheme } from '../Themes/Theme';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color:'inherit',
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  titleButton: {
    color:'inherit',
    fontSize: '18px',
    marginLeft: theme.spacing(-3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(13),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '580px', /*auto*/
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
      width: '20ch',
    },
  },
  button:{
    color: 'inherit',
  },
  iconButton: {
    color: 'inherit',
  },
  avatar: {
    width: '38px',
    height: '38px',
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const searchAll = (text) => {};

  return (
    <div className={classes.root}>
      <AppBar position="fixed" fixed='top' style={{ zindex: 1, backgroundColor: "#18181b"}}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            disableRipple
          >
            <MenuIcon />
          </IconButton>
          {/* <MidBar /> */}
          
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton disableRipple onClick={() => history.push("/")} className={classes.titleButton}>
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
          {/* <IconButton
            onClick={() => history.push("/")}
            aria-label="home page"
            disableRipple
            className={classes.iconButton}
          >
            <HomeIcon />
          </IconButton> */}
          
          <IconButton disableRipple onClick={() => history.push("/boards")} className={classes.iconButton}>
            <MdForum />
          </IconButton>

          <IconButton disableRipple onClick={() => history.push("/threads")} className={classes.iconButton}>
            <BiComment />
          </IconButton>

          <IconButton disableRipple onClick={() => CheckWeb3()} className={classes.iconButton}>
            <SiEthereum />
          </IconButton>
          
          {props.isAuthenticated ? null
            : <Button disableRipple onClick={() => history.push("/login")} className={classes.button}>
                Sign In
              </Button>
          }
          {props.isAuthenticated ? null
            : <Button disableRipple onClick={() => history.push("/sign_up")} className={classes.button}>
                Sign Up
              </Button>
          }

          {props.isAuthenticated ? (
            <Button disableRipple onClick={() => history.push("/password_update")} className={classes.button}>
              Update Password
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <Button disableRipple onClick={() => props.logout()} className={classes.button} >
              Logout
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <div>
              <Button disableRipple className={classes.button}>
                <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/defAvatar.jpg'}/>
              </Button>              
            </div>
                  
          ) : null}
          {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
        </Toolbar>
        {/* <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={
              <div className="pull-left">
                <img className="thumbnail-image" src={} alt="user pic" />

                {userData.Username}
              </div>
            }
            id="basic-nav-dropdown"
          >
            <SidebarData />
          </NavDropdown>
        </Nav> */}
      </AppBar>
    </div>
  );
}
