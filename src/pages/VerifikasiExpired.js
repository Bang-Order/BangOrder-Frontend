import * as React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
    width: '50%',
    height: 'auto',
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const VerifikasiExpired = () => {
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
            Link Verifikasi Telah Kadaluarsa
          </h2>
          <img className={classes.image} src="/verif-exp.png" alt="" />
          <p>Link verifikasi akun kamu telah kadaluarsa, silahkan kirim ulang email.</p>
          <PrimaryButton style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim Ulang Email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default VerifikasiExpired;