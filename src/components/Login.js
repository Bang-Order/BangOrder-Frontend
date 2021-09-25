import { Button, Input, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GrCheckbox } from 'react-icons/gr';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';



const BootstrapButton = styled(Button)({
  backgroundColor: "#FFC300",
  borderRadius: 7,
  border: 0,
  height: 50,
  width: 500,
  padding: '0 30px',
  fontSize: '24px',
  margin: '105px',
  marginBottom: '90px',
  textTransform: "unset",
  fontWeight: "bolder",
  color: "#000",
})

const BootstrapInput = styled(Input)({
  // background: "#F1F1F1",
  borderRadius: 10,
  height: 40,
  width: 500,
  padding: '10px',
  marginTop: '25px',
  fontSize: '16px',
})

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#989999',
  fontWeight: 'bold',
})

const Login = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div class="container">
        <img src="/logo-horizontal.png" alt="" />
        <h3>Contactless Food Ordering with QR Code</h3>
        <BootstrapInput placeholder="Email" type="" required />

        <BootstrapInput placeholder="Password" type="password" required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end" >
                {values.showPassword ? <FaEye /> : <FaEyeSlash />}
              </IconButton>
            </InputAdornment>
          }
        />

        <p class="left">
          <ListItem>
            <ListItemIcon>
              <GrCheckbox />
            </ListItemIcon>
            <ListItemText>Remember me</ListItemText>
          </ListItem>
        </p>
      </div>
      <div>
        <BootstrapButton>Sign In</BootstrapButton>
        {/* <p class="style-text">Don't have an account? <Link to="/register">Sign Up</Link></p> */}
      </div>
      <div class="style-text">
        <p >Don't have an account?&emsp;&emsp;&emsp;&emsp;&emsp;<StyledLink to="/register" >Sign Up</StyledLink></p>
      </div>
    </div>

  )
}
export default Login;