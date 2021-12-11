import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const VerfikasiEmail = () => {
  const classes = useStyle();

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>
            <ArrowBackIosIcon style={{ float: 'left' }} />
            Verifikasi Email Kamu
          </h2>
          <p>Terimakasih telah mendaftar</p>
          <img className={classes.image} src="/email.png" alt="" />
          <p>Cek email kamu dan klik link untuk aktivasi akun kamu.
            Apabila dalam beberapa saat kamu belum menerima email, silahkan cek di folder spam atau kirim ulang email. </p>
          <PrimaryButton style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim ulang email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default VerfikasiEmail;