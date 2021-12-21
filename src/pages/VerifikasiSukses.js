import * as React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import { useHistory } from 'react-router-dom';

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
  }

})

const VerifikasiSukses = () => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>Verifikasi Akun Berhasil</h2>
          <img className={classes.image} src="/verif-sukses.png" alt="" />
          <p>Verifikasi akun kamu berhasil, silahkan kembali ke halaman Log in untuk masuk. </p>
          <PrimaryButton onClick={history.push("/login")} style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kembali ke Log in</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default VerifikasiSukses;