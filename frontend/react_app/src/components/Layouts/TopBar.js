import React from "react";
import {AppBar, Toolbar, Typography, Button, 
        IconButton, InputBase, fade, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { BiComment } from "react-icons/bi";
import { MdForum } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";
import MidBar from "./MidBar";
import { searchBoard } from "../../store/actions/app/appActions";
import { useDispatch } from "react-redux";
import { MdLocalGroceryStore } from "react-icons/md";
import Avatar from '@material-ui/core/Avatar';
import Container from "@material-ui/core/Container";
import DropdownUser from './Dropdown'
import { Dropdown } from 'semantic-ui-react'
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { Nav, NavDropdown } from "react-bootstrap";
// import { SidebarData } from "../Utils/UserBarData";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const searchAll = (text) => {};

  return (
    <div className={classes.root}>
      <AppBar position="fixed" fixed='top' style={{ backgroundColor: "#18181b" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          {/* <MidBar /> */}
          
          <Typography className={classes.title} variant="h6" noWrap>
            Shatter
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // onChange={(e) => searchAll(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <IconButton
            onClick={() => history.push("/")}
            aria-label="home page"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
          
          <IconButton onClick={() => history.push("/boards")} color="inherit">
            <MdForum />
          </IconButton>

          <IconButton onClick={() => history.push("/threads")} color="inherit">
            <BiComment />
          </IconButton>

          <IconButton
            onClick={() => history.push("/favorites")}
            color="inherit"
          >
            <MdFavorite />
          </IconButton>

          <IconButton color="inherit">
            <MdLocalGroceryStore />
          </IconButton>

          {props.isAuthenticated ? (
            <Button color="inherit" href="/password_update">
              Update Password
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <Button color="inherit" onClick={() => props.logout()}>
              Logout
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <div>
              <Button color="inherit">
                <Avatar className={classes.small} alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
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
