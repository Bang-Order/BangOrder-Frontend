import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Button,
  InputBase,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { useHistory } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
require('dotenv').config();

const useStyle = makeStyles({
  logo: {
    width: '15%',
    height: 'auto',
    padding: 20,
    display: 'flex',
  },
  box: {
    boxShadow: 3,
  },
  image: {
    width: '20%',
    height: 'auto',
    marginTop: '20',
  },
  paperStyle: {
    padding: 30,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const ResetSandi = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const query = props.location.search.substring(1);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordNull, setIsPasswordNull] = React.useState(false);

  useEffect(() => {
    var param = query.split(("&"));
    for (var i = 0; i < param.length; i++) {
      var obj = param[i].split("=");
      var key = obj[0];
      var value = obj[1];
      setData(prevState => ({
        ...prevState,
        [key]: value
      }));
    }
  }, [])

  const handleContinueButton = () => {
    console.log(data);
    axios.post(process.env.REACT_APP_API_URL + 'auth/password/reset', data)
      .then((res) => {
        history.push("/reset-sandi-berhasil");
      })
      .catch((err) => {
        setError(err.response.data.errors);
      })
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData(prevState => ({
      ...prevState,
      [evt.target.name]: value
    }));
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const censorEmail = (email) => {
    var parts = email.split("@");
    var name = parts[0];
    var result = name.charAt(0);
    for (var i = 1; i < name.length; i++) {
      result += "*";
    }
    result += name.charAt(name.length - 1);
    result += "@";
    var domain = parts[1];
    result += domain.charAt(0);
    var dot = domain.indexOf(".");
    for (var i = 1; i < dot; i++) {
      result += "*";
    }
    result += domain.substring(dot);
    return result;
  }

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>
            <Button style={{ float: 'left' }} >
              <ArrowBackIosIcon />
            </Button>
            Atur Kata Sandi
          </h2>
          <p>Buat kata sandi baru untuk <b>{data && censorEmail(data.email)}</b></p>
          {error && <Alert sx={{ marginTop: "30px" }} severity="error">{error.password || error.confirm_password || "Token tidak valid"}</Alert>}
          <FormControl
            fullWidth
            variant="outlined" margin="normal"
            error={isPasswordNull ? true : false}
            required={isPasswordNull ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-password-input"
              label="Password"
              type={!showPassword ? "password" : "text"}
              name="password"
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined" margin="normal"
            error={isPasswordNull ? true : false}
            required={isPasswordNull ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">Konfirmasi Password</InputLabel>
            <OutlinedInput
              id="outlined-password-input"
              label="Konfirmasi Password"
              type={!showPassword ? "password" : "text"}
              name="confirm_password"
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <PrimaryButton style={{ width: '70%', fontSize: '16px', marginTop: 20 }} onClick={handleContinueButton} >Oke</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default ResetSandi; 
