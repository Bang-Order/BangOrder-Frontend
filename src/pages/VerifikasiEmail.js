import React, { useState } from "react";
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const VerfikasiEmail = (props) => {
  const [error, setError] = useState();
  const classes = useStyle();
  const token = props.location.state;
  const [loading, setLoading] = useState(false);
  
  const handleResend = () => {
    setLoading(true)
    axios.post(process.env.REACT_APP_API_URL+'auth/email/resend', null, { headers: { Authorization: 'Bearer ' + token.access_token } })
    .then((res) => {
      setLoading(false)
    })
    .catch((err) => {
      setError(err.response.message);
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
            Verifikasi Email Kamu
          </h2>
          <p>Terima kasih telah mendaftar</p>
          <img className={classes.image} src="/email.png" alt="" />
          <p>Cek email kamu dan klik link untuk aktivasi akun kamu.
            Apabila dalam beberapa saat kamu belum menerima email, silahkan cek di folder spam atau kirim ulang email. </p>
          <PrimaryButton loading={loading}  onClick={handleResend} style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim ulang email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default VerfikasiEmail;