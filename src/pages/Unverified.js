import React, { useState } from "react";
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import axios from "axios";

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
    width: '70%',
    height: 'auto',
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  },
  ppp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

const Unverified = (props) => {
  const classes = useStyle();
  const [error, setError] = useState();
  const data = useState(props.location.state);
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setLoading(true);
    axios.post(process.env.REACT_APP_API_URL + 'auth/email/resend', null, { headers: { Authorization: 'Bearer ' + data[0].access_token } })
      .then((res) => {
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response.message);
        setLoading(false)
      })
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
            Akun Kamu Belum Terverifikasi
          </h2>

          <img className={classes.image} src="/unverified.png" alt="" />
          <p>Akun kamu belum terverifikasi, silahkan kirim email untuk melanjutkan. </p>
          <PrimaryButton loading={loading} onClick={handleResend} style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim Email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default Unverified;