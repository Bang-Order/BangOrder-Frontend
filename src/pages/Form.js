import React, { useState } from "react";
import { InputLabel, InputBase, FormControl, Button, ListItem, ListItemIcon, Tooltip, Menu, MenuItem, Alert } from "@mui/material";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "../components/button/PrimaryButton";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";
import { useHistory } from "react-router-dom";
require('dotenv').config();

const useStyles = makeStyles(() => ({
  logo: {
    width: '15%',
    height: 'auto',
    padding: 20,
    display: 'flex',
  },
  image: {
    width: '100%',
    height: 'auto',
    margin: 5
  },
  body: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 5,
    paddingBottom: 15,
    marginBottom: 30,
    border: '2px solid #f1f1f1'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    marginLeft: 50,
    marginRight: 25,
    marginBottom: 10,
    // paddingTop: 20,
  },
  item: {
    marginTop: 20,
    width: "100%"
  },
  child: {
    marginTop: 80,
    width: "100%"
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
}))

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  minHeight: '180vh',
}))

const Frame = styled('div')(({ theme }) => ({
  backgroundColor: "#ffffff",
  marginLeft: 280,
  marginRight: 280,
  marginTop: 30,
  paddingTop: 30,
  paddingBottom: 50,
  borderRadius: 7,
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
  },
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
    padding: '10px 12px',
    width: '380px'
  },
}));

const Input = styled('input')({
  display: 'none',
});

const Form = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(props.location.state);
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const [selectedIndex] = useState();
  const [loading, setLoading] = useState();
  const banks = [
    {
      "id": "BCA",
      "name": "Bank Central Asia (BCA)"
    },
    {
      "id": "BNI",
      "name": "Bank Negara Indonesia (BNI)"
    },
    {
      "id": "BRI",
      "name": "Bank Rakyat Indonesia (BRI)"
    },
    {
      "id": "BTN",
      "name": "Bank Tabungan Negara (BTN)"
    },
    {
      "id": "CIMB",
      "name": "Bank CIMB Niaga"
    },
    {
      "id": "DANAMON",
      "name": "Bank Danamon"
    },
    {
      "id": "MANDIRI",
      "name": "Bank Mandiri"
    }
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData(prevState => ({
      ...prevState,
      [evt.target.name]: value
    }));
    console.log(data);
  }
  const handleImageChange = (evt) => {
    setImage(evt.target.files[0]);
    setData(prevState => ({
      ...prevState,
      image: image
    }));
  }

  const handleBankChange = (bank) => {
    setData(prevState => ({
      ...prevState,
      bank_name: bank.id,
      bank_code: bank.name
    }));
    handleClose()
  }

  const handleSubmit = () => {
    setLoading(true);
    let formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    for (var key in data) {
      formData.append(key, data[key]);
    }
    axios.post(process.env.REACT_APP_API_URL + 'auth/register/profile', formData)
      .then((res) => {
        history.push({
          pathname: "/verifikasi-email",
          state: res.data.data
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
        setLoading(false);
      })
  }

  return (
    <Root>
      <div>
        <header>
          <img src="/logo-horizontal.png" alt="" className={classes.logo} />
        </header>
        <div>
          <Frame>
            <div>
              <div className={classes.body} >
                <h2 style={{ paddingTop: 10 }}>Data Restoran</h2>
                <Divider style={{ margin: 20 }} />
                {error && <Alert sx={{ marginTop: "30px" }} severity="error">
                  {
                    error.errors.name ||
                    error.errors.address ||
                    error.errors.owner_name ||
                    error.errors.telephone_number ||
                    error.errors.account_holder_name ||
                    error.errors.account_number ||
                    error.errors.bank_name
                  }</Alert>}
                <div className={classes.content}>
                  <div className={classes.left}>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nama Restoran
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nama restoran"
                          id="bootstrap-input"
                          name="name"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Alamat Lengkap
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Alamat lengkap"
                          id="bootstrap-input"
                          name="address"
                          multiline
                          minRows={3}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.right}>
                    <div>
                      <img className={classes.image} src={image ? URL.createObjectURL(image) : 'thumbnail.svg'} alt="" variant="outlined" />
                      <label htmlFor="contained-button-file">
                        <Input onChange={handleImageChange} accept="image/*" id="contained-button-file" multiple type="file" name="image" />
                        <ListItem>
                          <PrimaryButton width="100%" component="span">
                            Upload
                          </PrimaryButton>
                          <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={open}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              title="Gunakan foto berekstensi jpg/png dengan rasio 1:1 (MAX 1 MB)">
                              <ListItemIcon>
                                <Button>
                                  <InfoOutlinedIcon onClick={handleTooltipOpen} />
                                </Button>
                              </ListItemIcon>
                            </Tooltip>
                          </ClickAwayListener>
                        </ListItem>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.body}>
                  <h2 style={{ paddingTop: 10 }}>Data Pemilik</h2>
                  <Divider style={{ margin: 20 }} />
                  <div className={classes.content}>
                    <FormControl variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Nama Pemilik
                      </InputLabel>
                      <BootstrapInput
                        placeholder="Nama pemilik"
                        id="bootstrap-input"
                        name="owner_name"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl variant="standard" style={{ marginLeft: 30 }}>
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Nomor telepon
                      </InputLabel>
                      <BootstrapInput
                        placeholder="Nomor telepon"
                        id="bootstrap-input"
                        name="telephone_number"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </div>
                </div>
                <div>
                  <div className={classes.body}>
                    <h2 style={{ paddingTop: 10 }}>Data Rekening Bank</h2>
                    <Divider style={{ margin: 20 }} />
                    <div className={classes.content}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px", display: 'flex' }}>
                          Nama&nbsp; <span style={{ fontSize: "18px" }} > (harus sesuai dengan Rekening Bank)</span>
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nama"
                          id="bootstrap-input"
                          name="account_holder_name"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl variant="standard" style={{ marginLeft: 30 }}>
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nomor Rekening
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nomor rekening"
                          id="bootstrap-input"
                          name="account_number"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <div >
                      </div>
                    </div>
                    <div className={classes.content} style={{ marginTop: 30 }}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Bank
                        </InputLabel>
                        <Button
                          id="button-bank"
                          style={{ width: 390, marginTop: 30, border: '1px solid #BCBCBC' }}
                          className='dropdown'
                          onClick={handleClick}
                        >
                          {data && data.bank_code ? data.bank_code : "Pilih Bank"}
                          <ArrowDropDownIcon />
                        </Button>
                        <Menu
                          id="pilih-bank"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: '390px',
                              backgroundColor: "white",
                            },
                          }}
                        >
                          {banks.map(bank =>
                            <MenuItem
                              key={bank.id}
                              selected={bank.id === selectedIndex}
                              onClick={() => handleBankChange(bank)}
                            >
                              {bank.name}
                            </MenuItem>
                          )}
                        </Menu>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 50 }}>
                <PrimaryButton loading={loading} onClick={handleSubmit} style={{ float: 'right', marginRight: 25 }}>Selesai</PrimaryButton>
              </div>
            </div>
          </Frame>
        </div>
      </div >
    </Root >
  );
}

export default Form;