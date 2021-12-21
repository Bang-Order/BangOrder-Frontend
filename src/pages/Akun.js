import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button, ListItem, Tooltip, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useHistory } from 'react-router';
import { api } from '../utils/api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Cookies from 'js-cookie';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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
    width: 300,
    height: 'auto',
    marginTop: 20,
    marginBottom: 20
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
    width: '300px',
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
  const [loading, setLoading] = useState(true);
  const [resto, setResto] = useState();
  const [image, setImage] = useState();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex] = React.useState();
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

  useEffect(() => {
    api.get(Cookies.get("RestoId"), { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
      .then((res) => {
        setResto(res.data)
        setLoading(false)
      })
  }, [])

  const getBankName = (id) => {
    for (var i = 0; i < banks.length; i++) {
      if (banks[i].id === id) {
        return banks[0].name;
      }
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBankChange = (bank) => {
    setResto(prevState => ({
      ...prevState,
      bank_name: bank.id,
      bank_code: bank.name
    }));
    handleClose()
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setResto(prevState => ({
      ...prevState,
      [evt.target.name]: value
    }));
  }
  const handleImageChange = (evt) => {
    setImage(evt.target.files[0]);
    setResto(prevState => ({
      ...prevState,
      image: image
    }));
  }

  const handleSaveButton = () => {
    let formData = new FormData();
    formData.append('image', image);
    for (var key in resto) {
      formData.append(key, resto[key]);
    }
    formData.delete('image');
    if (image) {
      formData.append('image', image);
    }
    api.post(Cookies.get("RestoId")+'?_method=PUT', formData, {
      headers: {
        'Content-Type': 'application/form-data; ',
        Authorization: 'Bearer ' + Cookies.get("BangOrderToken")
      }
    })
      .then(() => { history.push("/") })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

  return (
    <Root>
      <div>
        <div>
          {loading ? <p>loading</p>
            :
            <>
              <Frame>
                <div className={classes.content}>
                  <div className={classes.left}>
                    <h2>Data Restoran</h2>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nama Restoran
                        </InputLabel>
                        <BootstrapInput
                          onChange={handleChange}
                          value={resto.name}
                          placeholder="Nama restoran"
                          id="bootstrap-input"
                          name="name"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Email
                        </InputLabel>
                        <BootstrapInput
                          onChange={handleChange}
                          value={resto.email}
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
                          onChange={handleChange}
                          placeholder="alamat"
                          id="bootstrap-input"
                          name="address"
                          multiline
                          minRows={3}
                          value={resto.address}
                          style={{ width: '400px' }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.right}>
                    <div>
                      <img className={classes.image} src={image ? URL.createObjectURL(image) : resto.image} alt="" variant="outlined" />
                      <label htmlFor="contained-button-file">
                        <Input accept="image/*" onChange={handleImageChange} id="contained-button-file" multiple type="file" />
                        <ListItem>
                          <PrimaryButton width="80%" component="span">
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
                                  <InfoOutlinedIcon style={{ marginLeft: 20 }} onClick={handleTooltipOpen} />
                                </Button>
                              </ListItemIcon>
                            </Tooltip>
                          </ClickAwayListener>
                        </ListItem>
                      </label>
                    </div>
                  </div>
                </div>
                <div className={classes.content}>
                  <div style={{ width: '100%' }}>
                    <h2>Data Pemilik</h2>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nama Pemilik
                        </InputLabel>
                        <BootstrapInput
                          onChange={handleChange}
                          placeholder="Nama Pemilik"
                          id="bootstrap-input"
                          name="owner_name"
                          value={resto.owner_name}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
                      <FormControl variant="standard" font-size="24px">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          No Telepon
                        </InputLabel>
                        <BootstrapInput
                          type='number'
                          onChange={handleChange}
                          placeholder="Nomor Telepon"
                          id="bootstrap-input"
                          name="telephone_number"
                          value={Number(resto.telephone_number)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </Frame>
              <Frame style={{ marginTop: 20 }}>
                <div className={classes.content}>
                  <div style={{ width: '100%' }}>
                    <h2>Data Rekening Bank</h2>
                    <div className={classes.item}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px", display: 'flex' }}>
                          Nama&nbsp; <span style={{ fontSize: "18px" }} > (harus sesuai dengan Rekening Bank)</span>
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nama"
                          id="bootstrap-input"
                          name="account_holder_name"
                          value={resto.account_holder_name}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.item}>
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
                          {resto && resto.bank_code ? resto.bank_code : getBankName(resto.bank_name)}
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
                      <FormControl variant="standard" style={{ marginLeft: 30 }}>
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nomor Rekening
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nomor rekening"
                          id="bootstrap-input"
                          name="account_number"
                          value={resto.account_number}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.navButton}>
                      <PrimaryButton width="100px" onClick={handleSaveButton}>
                        Simpan
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </Frame>
            </>
          }
        </div>
      </div>
    </Root>
  )
}

export default Akun;