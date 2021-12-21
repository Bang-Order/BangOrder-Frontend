import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { Alert, InputLabel } from "@mui/material";
import { api } from '../utils/api';
import Cookies from "js-cookie";
import { useHistory } from 'react-router';
require('dotenv').config();

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  minHeight: '100vh',
  paddingBottom: 20,
  paddingTop: 20,
}))

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginLeft: 50,
    marginRight: 25,
    paddingTop: 20,
  },
  item: {
    marginTop: 20,
    width: "100%"
  },
  navButton: {
    display: "flex",
    justifyContent: "center",
    width: '100%',
    marginTop: 20
  }
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
  },
  '& .MuiInputBase-input': {

    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 14,
    width: '500px',
    padding: '10px 12px',
  },
}));

const Frame = styled('div')(({ theme }) => ({
  backgroundColor: "#fff",
  marginLeft: 280,
  marginRight: 20,
  marginTop: 65,
  paddingBottom: 20,
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
  },
}));

const UbahSandi = () => {
  const classes = useStyles();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData(prevState => ({
      ...prevState,
      [evt.target.name]: value
    }));
    console.log(data);
  }

  const handleSubmit = (evt) => {
    api.post(Cookies.get("RestoId") + '/change-password', data, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      })
  }

  return (
    <Root>
      <div>
        <div>
          <Frame>
            <div className={classes.content}>
              {error && <Alert sx={{ marginTop: "10px" }} severity="error">{error.errors ? (error.errors.old_password || error.errors.new_password || error.errors.confirm_new_password[0]) : error.message}</Alert>}
              <div className={classes.item}>
                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                    Kata Sandi Lama
                  </InputLabel>
                  <BootstrapInput
                    type='password'
                    placeholder="Kata Sandi Lama"
                    id="bootstrap-input"
                    name="old_password"
                    onChange={handleChange}
                  />
                  {/* <StyledLink to="/lupa-password" >Lupa Password</StyledLink> */}
                </FormControl>

              </div>
              <div className={classes.item}>
                <FormControl variant="standard" font-size="24px">
                  <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                    Kata Sandi Baru
                  </InputLabel>
                  <BootstrapInput
                    type='password'
                    placeholder="Kata Sandi Baru"
                    id="bootstrap-input"
                    name="new_password"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.item}>
                <FormControl variant="standard" font-size="24px">
                  <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                    Konfirmasi Kata Sandi
                  </InputLabel>
                  <BootstrapInput
                    type='password'
                    placeholder="Konfirmasi Kata Sandi"
                    id="bootstrap-input"
                    name="confirm_new_password"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.navButton}>
                <PrimaryButton width="100px" onClick={handleSubmit}>
                  Simpan
                </PrimaryButton>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </Root>
  )
}

export default UbahSandi;