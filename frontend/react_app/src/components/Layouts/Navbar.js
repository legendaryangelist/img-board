import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { IconButton, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
  }));


export default function Topbar(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const searchAll = (text) => {};
  
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                Shatter
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="threads">Threads</Nav.Link>
                <Nav.Link href="boards">Boards</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }

