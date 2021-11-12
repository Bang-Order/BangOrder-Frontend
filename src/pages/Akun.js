import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { GET_RESTAURANT } from "../utils/Urls";
import PrimaryButton from '../components/button/PrimaryButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SecondaryButton from '../components/button/SecondaryButton';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button,  Radio} from "@mui/material";
import { useHistory } from 'react-router';


const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  minHeight: '100vh',
  paddingBottom: 20
}))

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    marginLeft: 50,
    marginRight: 25,
    paddingTop: 20,
  },
  item: {
    marginTop: 20,
    width: "100%"
  },
  image: {
    width: "100%",
    height: 'auto',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  right: {
    width: '40%',
    marginRight: 20,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  navButton: {
    display: "flex",
    justifyContent: "flex-end",
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

const Input = styled('input')({
  display: 'none',
});

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

const Akun = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resto, setResto] = useState();
  const restoId = localStorage.getItem("RestoId");
  const history = useHistory();

  useEffect(()  => {
    axios.get(GET_RESTAURANT + restoId + '/restaurants/')
    .then((res) => {
        setResto(res.data);
        setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    })
  }, [restoId])

  const handleSaveButton = () => {
    axios.put(GET_RESTAURANT + restoId + '/restaurants/' + resto, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
      .then(history.push("/akun-saya"));
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setResto(prevState => ({
      ...prevState,
      [evt.target.name]: value,
      [evt.target.email]: value,
    }));
  }

  return (
    <Root>
      <div>
        <Sidebar name="Akun Saya"/>
        <div>
            <Frame>
              <div className={classes.content}>
                  <div className={classes.left}>
                    <h2>Data Restoran</h2>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nama Restourant
                        </InputLabel>
                        <BootstrapInput
                          //onChange={handleChange}
                          //value={resto.name}
                          placeholder="Nama restoran"
                          id="bootstrap-input"
                          name="nameResto"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Email
                        </InputLabel>
                        <BootstrapInput
                          //onChange={handleChange}
                          //value={resto.email}
                          placeholder="email"
                          id="bootstrap-input"
                          name="email"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Alamat Lengkap
                        </InputLabel>
                        <BootstrapInput
                          placeholder="alamat"
                          id="bootstrap-input"
                          name="alamat"
                          multiline
                          minRows={3}
                          style={{ width: '400px' }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.right}>
                    <div>
                      <label style={{ fontSize: "24px" }}>
                        Foto Restoran 
                      </label>
                      <img className={classes.image} alt="" variant="outlined" />
                      <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                      <PrimaryButton width="100%" component="span">
                        Upload
                      </PrimaryButton>
                    </label>
                    </div>
                 </div>
                 
              </div>
              <div className={classes.content}>
                <div style={{width: '100%'}}>
                    <h2>Data Pemilik</h2>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nama Pemilik
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nama Pemilik"
                          id="bootstrap-input"
                          name="namePemilik"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          No Telepon
                        </InputLabel>
                        <BootstrapInput
                          placeholder="no tlp"
                          id="bootstrap-input"
                          name="tlp"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <h4>Jenis Kelamin</h4>
                      <RadioGroup name="kelamin">
                        <FormControlLabel value="1" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Laki-Laki" />
                        <FormControlLabel value="0" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Perempuan" />
                      </RadioGroup>
                    </div>
                    <div className={classes.navButton}>
                      <PrimaryButton width="100px">
                        Simpan
                      </PrimaryButton>
                    </div>
                    
                  </div>
              </div>
            </Frame>
            <Frame style={{marginTop: 30}}>
              <div className={classes.content}>
                <div className={classes.item}>
                  <h2>Rekening Bank</h2>
                  
                </div>
              </div>
            </Frame>
          </div>
        </div>
    </Root>
  )
}

export default Akun;