import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { InputLabel,  Radio} from "@mui/material";


const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  minHeight: '100vh',
  paddingBottom: 20
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
  backgroundColor: "#ffffff",
  marginLeft: 280,
  marginRight: 20,
  marginTop: 90,
  paddingBottom: 20,
  borderRadius: 7,
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
  },
}));

const UbahSandi = () => {
  const classes = useStyles();

  return (
    <Root>
      <div>
        <Sidebar name="Ubah Kata Sandi"/>
        <div>
            <Frame>
              <div className={classes.content}>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Kata Sandi Lama
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Kata Sandi Lama"
                          id="bootstrap-input"
                          name="sandiLama"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Kata Sandi Baru
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Kata Sandi Baru"
                          id="bootstrap-input"
                          name="sandiBaru"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Konfirmasi Kata Sandi
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Konfirmasi Kata Sandi"
                          id="bootstrap-input"
                          name="konfirmasiSandi"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.navButton}>
                      <PrimaryButton width="100px">
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