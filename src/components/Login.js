import { TextField, Button } from "@mui/material";
// import { render } from "@testing-library/react";
import React from "react";
import { makeStyles } from '@mui/styles';
// import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    background: "#FFC300",
    borderRadius: 7,
    border: 0,
    height: 60,
    width: 586,
    padding: '0 30px',
    fontSize: '24px',
    marginTop: '193px'
    // fontFamily: 'Manrope',
  },
  textField: {
    background: "#F1F1F1",
    borderRadius: 10,
    height: 55,
    width: 586,
    marginTop: '10px',
    position: 'below',
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <div>
      <div class="container">
        <img src="/logo-horizontal.png" alt="" />
        <h3>Contactless Food Ordering with Scan QR Code</h3>
        <TextField className={classes.textField} label="Email" required />
        <TextField className={classes.textField} label="Password" required />
        <p class="left">Remember me</p>
      </div>
      <div >
      </div>
      <div class="container">
        <Button className={classes.button}>Sign In</Button>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
      </div>
    </div>

  )
}

export default Login;