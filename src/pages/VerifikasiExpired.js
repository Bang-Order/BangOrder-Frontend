import React, { useState } from "react";
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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

const VerifikasiExpired = (props) => {
  const classes = useStyle();
  const [setError] = useState();
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
            <ArrowBackIosIcon style={{ float: 'left' }} />
            Link Verifikasi Telah Kadaluarsa
          </h2>
          <img className={classes.image} src="/verif-exp.png" alt="" />
          <p>Link verifikasi akun kamu telah kadaluarsa, silahkan kirim ulang email.</p>
          <PrimaryButton loading={loading} onClick={handleResend} style={{ width: '80%', fontSize: '16px', marginTop: 20 }}>Kirim Ulang Email</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default VerifikasiExpired;