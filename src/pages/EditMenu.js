import * as React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { InputLabel, TextareaAutosize, InputAdornment, IconButton, Button, Radio } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { CheckBox } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';


// import ListMenu from "../components/listmenu/ListMenu";

const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    paddingBottom: 20,
  },
  item: {
    paddingTop: 20,
    marginRight: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
    minWidth: 300,
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '40%',
    minWidth: 370,
    maxWidth: 390,
    marginRight: 20,
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

const BootstrapButton = styled(Button)({
  backgroundColor: "#FFC300",
  borderRadius: 7,
  border: 0,
  width: '70%',
  marginTop: 50,
  marginBottom: 40,
  fontSize: '18px',
  textTransform: "unset",
  fontWeight: "bolder",
  color: "#000",
})

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
    // Use the system font instead of the default Roboto font.

  },
}));

const BootstrapArea = styled(TextareaAutosize)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
  },
}));

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  height: '100vh',
}))

const EditMenu = () => {
  const classes = useStyles();

  return (
    <Root>
      <div>
        <Sidebar />
        <div>
          <Frame>
            <div className={classes.content}>
              <div className={classes.left}>
                <div className={classes.item}>
                  <FormControl variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                      Nama Menu
                    </InputLabel>
                    <BootstrapInput placeholder="Nama menu" id="bootstrap-input" />
                  </FormControl>
                </div>
                <div className={classes.item}>
                  <FormControl variant="standard" font-size="24px">
                    <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                      Harga Menu
                    </InputLabel>
                    <BootstrapInput placeholder="Nama menu" id="bootstrap-input" />
                  </FormControl>
                </div>
                <div className={classes.item}>
                  <FormControl variant="standard" font-size="24px">
                    <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                      Kategori Menu
                    </InputLabel>
                    <BootstrapInput placeholder="Kategori Menu" id="bootstrap-input"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">	<ArrowDropDownIcon /></IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </div>
                <div className={classes.item}>
                  <FormControl variant="standard" font-size="24px">
                    <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                      Deskripsi Menu
                    </InputLabel>
                    <BootstrapArea placeholder="Deskripsi Menu" id="bootstrap-input" minRows={3} style={{ width: '330px' }} />
                  </FormControl>
                </div>
              </div>
              <div className={classes.right}>
                <div>
                  <img className={classes.image} src="./cemilan/pangsit.jpg" alt="" variant="outlined" />
                  <BootstrapButton>Upload</BootstrapButton>
                </div>
                <div>
                  <h4>Status Makanan</h4>
                  <RadioGroup >
                    <FormControlLabel value="female" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Tersedia" />
                    <FormControlLabel value="male" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Habis" />
                  </RadioGroup>
                </div>
                <div>
                  <FormControlLabel
                    value="start"
                    control={<Checkbox defaultChecked style={{ color: "#ffc300" }} />}
                    label={<h4>Rekomendasi</h4>}
                    labelPlacement="start"
                  />
                </div>
              </div>
            </div>
          </Frame>
        </div>
      </div >
    </Root >
  )
}

export default EditMenu;