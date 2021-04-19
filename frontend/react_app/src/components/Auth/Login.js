import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/auth/authActions";
import Card from '@material-ui/core/Card';
import { Container, Row, Col } from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: 485,
    backgroundColor: "#EBEBEB",
    color: '#242424'/*"inherit"*/, 
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: "#4169E1",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: 50,
    marginRight: 50,
    width: 400,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: 50,
    marginRight: 50,
    width: 400,
    color:"#efeff1",
    backgroundColor: "#4169E1",
    '&:hover': {
      background: "#0000CD",
   },  
  },
  multilineColor:{
    color:'inherit'
  }, 
}));

function Login(props) {
  const classes = useStyles();

  const [username, setuserName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  
  const dispatch = useDispatch();

  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case "username":
        setuserName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAuth(username, email, password);
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  React.useEffect(() => {
    if (props.isAuthenticated) {
      history.replace(from);
      // getBoardData()(dispatch);
    }
  });

  return (
    <Container fluid style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  // fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  className={classes.textField}
                  InputProps={{className: classes.multilineColor}}
                  onChange={handleFormFieldChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  className={classes.textField}
                  InputProps={{className: classes.multilineColor}}
                  autoComplete="email@example.com"
                  onChange={handleFormFieldChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  className={classes.textField}
                  InputProps={{className: classes.multilineColor}}
                  autoComplete="current-password"
                  onChange={handleFormFieldChange}
                />
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  // color="secondary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </form>
            </div>
          </Card>
        </Col> 
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password) =>
      dispatch(actions.authLogin(username, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
