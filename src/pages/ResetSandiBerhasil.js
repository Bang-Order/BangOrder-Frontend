import * as React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import PrimaryButton from '../components/button/PrimaryButton';

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
    width: '20%',
    height: 'auto',
    marginTop: '20',
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const ResetSandiBerhasil = () => {
  const classes = useStyle();
  const history = useHistory();

  const handleContinueButton = () => {
    history.push("/login");
}

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>
            Reset Kata Sandi Berhasil
          </h2>
          <img className={classes.image} src="/success.png" alt="" />
          <p>
              Berhasil mengatur ulang kata sandi
          </p>
          <PrimaryButton style={{ width: '70%', fontSize: '16px', marginTop: 20 }} onClick={handleContinueButton} >Kembali Ke Log in</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default ResetSandiBerhasil; 
