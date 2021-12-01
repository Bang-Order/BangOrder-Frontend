import React from "react";
import { Grid, InputLabel, InputBase, FormControl, Button, ListItem, ListItemIcon, Tooltip, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "../components/button/PrimaryButton";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

const options = [
  'BPD Aceh',
  'BPD Aceh UUS',
  'Bank Agris',
  // Bank BRI Agroniaga
  // Bank Amar Indonesia (formerly Anglomas International Bank)
  // Bank Andara
  // Anglomas International Bank
  // Bank ANZ Indonesia
  // Bank Arta Niaga Kencana
  // Bank Artha Graha International
  // Bank Artos Indonesia (Bank Jago)
  // BPD Bali
  // Bank of America Merill-Lynch
  // Bangkok Bank
  // BPD Banten (formerly Bank Pundi Indonesia)
  // Bank Central Asia (BCA)
  // Bank Central Asia Digital (BluBCA)
  // Bank Central Asia (BCA) Syariah
  // BPD Bengkulu
  // Bank Bisnis Internasional
  // Bank BJB
  // Bank BJB Syariah
  // Bank Negara Indonesia (BNI)
  // Bank BNP Paribas
  // Bank of China (BOC)
  // Bank Rakyat Indonesia (BRI)
  // Bank Tabungan Negara (BTN)
  // Bank Tabungan Negara (BTN) UUS
  // BTPN Syariah (formerly BTPN UUS and Bank Sahabat Purba Danarta)
  // Bank Bukopin
  // Bank Syariah Bukopin
  // Bank Bumi Arta
  // Bank Syariah Indonesia (BSI)
  // Bank Capital Indonesia
  // China Construction Bank Indonesia (formerly Bank Antar Daerah and Bank Windu Kentjana International)
  // Centratama Nasional Bank
  // Bank Chinatrust Indonesia
  // Bank CIMB Niaga
  // Bank CIMB Niaga UUS
  // Citibank
  // Bank Commonwealth
  // BPD Daerah Istimewa Yogyakarta (DIY)
  // BPD Daerah Istimewa Yogyakarta (DIY) UUS
  // Bank Danamon
  // Bank Danamon UUS
  // Bank DBS Indonesia
  // Deutsche Bank
  // Bank Dinar Indonesia
  // Bank DKI
  // Bank DKI UUS
  // Indonesia Eximbank (formerly Bank Ekspor Indonesia)
  // Bank Fama International
  // Bank Ganesha
  // Bank Hana
  // Bank Harda Internasional
  // Bank Himpunan Saudara 1906
  // HSBC Indonesia (formerly Bank Ekonomi Raharja)
  // Hongkong and Shanghai Bank Corporation (HSBC) UUS
  // Bank ICBC Indonesia
  // Bank Ina Perdania
  // Bank Index Selindo
  // Bank of India Indonesia
  // BPD Jambi
  // BPD Jambi UUS
  // Bank Jasa Jakarta
  // BPD Jawa Tengah
  // BPD Jawa Tengah UUS
  // BPD Jawa Timur
  // BPD Jawa Timur UUS
  // JP Morgan Chase Bank
  // Bank JTrust Indonesia (formerly Bank Mutiara)
  // BPD Kalimantan Barat
  // BPD Kalimantan Barat UUS
  // BPD Kalimantan Selatan
  // BPD Kalimantan Selatan UUS
  // BPD Kalimantan Tengah
  // BPD Kalimantan Timur
  // BPD Kalimantan Timur UUS
  // Bank Kesejahteraan Ekonomi
  // BPD Lampung
  // BPD Maluku
  // Bank Mandiri
  // Mandiri Taspen Pos (formerly Bank Sinar Harapan Bali)
  // Bank Maspion Indonesia
  // Bank Mayapada International
  // Bank Maybank
  // Bank Maybank Syariah Indonesia
  // Bank Mayora
  // Bank Mega
  // Bank Syariah Mega
  // Bank Mestika Dharma
  // Bank Mitra Niaga
  // Bank Sumitomo Mitsui Indonesia
  // Bank Mizuho Indonesia
  // Bank MNC Internasional
  // Bank Muamalat Indonesia
  // Bank Multi Arta Sentosa
  // Bank Nationalnobu
  // BPD Nusa Tenggara Barat
  // BPD Nusa Tenggara Barat UUS
  // BPD Nusa Tenggara Timur
  // Bank Nusantara Parahyangan
  // Bank OCBC NISP
  // Bank OCBC NISP UUS
  // Bank Oke Indonesia (formerly Bank Andara)
  // Bank Panin
  // Bank Panin Syariah
  // BPD Papua
  // Bank Permata
  // Bank Permata UUS
  // Prima Master Bank
  // Bank QNB Indonesia (formerly Bank QNB Kesawan)
  // Bank Rabobank International Indonesia
  // Royal Bank of Scotland (RBS)
  // Bank Resona Perdania
  // BPD Riau Dan Kepri
  // BPD Riau Dan Kepri UUS
  // Bank Royal Indonesia
  // Bank Sahabat Sampoerna
  // Bank SBI Indonesia
  // Bank Shinhan Indonesia (formerly Bank Metro Express)
  // Bank Sinarmas
  // Bank Sinarmas UUS
  // Standard Charted Bank
  // BPD Sulawesi Tengah
  // BPD Sulawesi Tenggara
  // BPD Sulselbar
  // BPD Sulselbar UUS
  // BPD Sulut
  // BPD Sumatera Barat
  // BPD Sumatera Barat UUS
  // BPD Sumsel Dan Babel
  // BPD Sumsel Dan Babel UUS
  // BPD Sumut
  // BPD Sumut UUS
  // Bank Tabungan Pensiunan Nasional (BTPN)
  // Bank of Tokyo Mitsubishi UFJ (MUFJ)
  // Bank UOB Indonesia
  // Bank Victoria Internasional
  // Bank Victoria Syariah
  // Bank Woori Indonesia
  // Bank Woori Saudara Indonesia 1906 (formerly Bank Himpunan Saudara and Bank Woori Indonesia)
  // Bank Yudha Bhakti (Bank Neo Commerce)
];

const Form = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState();
  // const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
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
                          name="resto-name"
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
                          name="resto-address"
                          multiline
                          minRows={3}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.right}>
                    <div>
                      <img src="./logo512.png" alt="" variant="outlined" className={classes.image} />
                      <label htmlFor="contained-button-file">
                        <Input />
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
                        name="owner-name"
                      />
                    </FormControl>
                    <FormControl variant="standard" style={{ marginLeft: 30 }}>
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Nomor telepon
                      </InputLabel>
                      <BootstrapInput
                        placeholder="Nomor telepon"
                        id="bootstrap-input"
                        name="telp"
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
                          name="account-name"
                        />
                      </FormControl>
                      <FormControl variant="standard" style={{ marginLeft: 30 }}>
                        <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                          Nomor Rekening
                        </InputLabel>
                        <BootstrapInput
                          placeholder="Nomor rekening"
                          id="bootstrap-input"
                          name="account-number"
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
                          Pilih Bank
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
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 50 }}>
                <PrimaryButton style={{ float: 'right', marginRight: 25 }}>Selesai</PrimaryButton>
              </div>
            </div>
          </Frame>
        </div>
      </div >
    </Root >
  );
}

export default Form;
