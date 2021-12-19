import React, { useState } from "react";
import { Paper, InputBase, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/button/PrimaryButton';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
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
    // width: '70%',
    // alignContent: 'center'
  },
  image: {
    width: '40%',
    height: 'auto',
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'flex',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 12px',
  },
}));

const LupaPassword = () => {
  const classes = useStyle();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleContinueButton = () => {
    setLoading(true);
    axios.post(process.env.REACT_APP_API_URL + 'auth/password/send-email', { email: email })
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: "/lupa-pass-Verif",
          state: {
            email: email
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }

  const handleEmailChange = (evt) => {
    const value = evt.target.value;
    setEmail(value);
  }

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>
            <Link to="/login">
              <ArrowBackIosIcon style={{ float: 'left' }} />
            </Link>
            Reset Kata Sandi
          </h2>
          <FormControl
            style={{ marginTop: '30px' }}
            fullWidth
            variant="standard"
          >
            <BootstrapInput
              placeholder="Email"
              id="bootstrap-input"
              name="email"
              onChange={handleEmailChange}
            />
          </FormControl>
          <PrimaryButton loading={loading} style={{ width: '70%', fontSize: '16px', marginTop: 20 }} onClick={handleContinueButton}>Berikutnya</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default LupaPassword;

