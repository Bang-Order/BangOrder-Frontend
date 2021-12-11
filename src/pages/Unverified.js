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

const Unverified = () => {
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
            Akun Kamu Belum Terverifikasi
          </h2>

          <img className={classes.image} src="/unverified.png" alt="" />
          <p>Akun kamu belum terverifikasi, silahkan kirim email untuk melanjutkan. </p>
          <PrimaryButton style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim Email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default Unverified;