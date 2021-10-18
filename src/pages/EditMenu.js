import React, { useState, useEffect } from "react";
import Sidebar from '../components/sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { InputLabel, TextareaAutosize, Button, Radio } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GET_RESTAURANT } from "../utils/Urls";
import { Menu, MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
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
    width: "80%",
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
  },
  navButton: {
    display: "flex",
    justifyContent: "space-between",
  }
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
  width: '80%',
  marginTop: 50,
  marginBottom: 40,
  fontSize: '18px',
  textTransform: "unset",
  fontWeight: "bolder",
  color: "#000",
})
const ControlButton = styled(Button)({
  backgroundColor: "white",
  borderRadius: 7,
  border: 1,
  borderStyle: "solid",
  width: '30%',
  marginTop: 30,
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

const EditMenu = (props) => {
  const classes = useStyles();
  const menuId = props.match.params.menuId;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [category, setCategory] = useState();
  const [recommendation, setRecommendation] = useState();
  const [allCategory, setAllCategory] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const restoId = localStorage.getItem("RestoId");
  const history = useHistory();
  useEffect(() => {
    axios.get(GET_RESTAURANT + restoId + '/menus/' + menuId)
      .then((res) => {
        setMenu(res.data);
        setName(res.data.name);
        setCategory(res.data.menu_category);
        setPrice(res.data.price);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
  }, [menuId, restoId])

  useEffect(() => {
    axios.get(GET_RESTAURANT + restoId + '/menu-categories')
      .then((res) => {
        setAllCategory(res.data.data);
      })
  },[])

  const handleSaveButton = () => {
    axios.put(GET_RESTAURANT + restoId + '/menus/' + menuId, {
      name: name,
      price: price,
      description: description,
      status: status
    }, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
      .then(history.push("/list-menu"));
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Root>
      {menu &&
        <div>
          <Sidebar index="4" name="Edit Menu" />
          <div>
            <Frame>
              <div className={classes.content}>
                <div className={classes.left}>
                  <div className={classes.item}>
                    <FormControl variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Nama Menu
                      </InputLabel>
                      <BootstrapInput
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={menu.name}
                        placeholder="Nama menu"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Harga Menu
                      </InputLabel>
                      <BootstrapInput
                        onChange={(e) => setPrice(e.target.value)}
                        defaultValue={menu.price}
                        placeholder="Harga menu"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Kategori Menu
                      </InputLabel>
                      <Button style={{width:250, marginTop:30}} className='dropdown' onClick={handleClick}>
                        {category}
                        <ArrowDropDownIcon />
                      </Button>
                      <Menu
                        id="filter-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            width: '250px',
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {allCategory && allCategory.map(category =>
                          <MenuItem >{category.name}</MenuItem>
                        )}
                      </Menu>
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Deskripsi Menu
                      </InputLabel>
                      <BootstrapArea
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={menu.description}
                        placeholder="Deskripsi Menu"
                        id="bootstrap-input"
                        minRows={3}
                        style={{ width: '330px' }}
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <h4>Status Makanan</h4>
                    <RadioGroup onChange={(e) => setStatus(e.target.value)} defaultValue={menu.is_available}>
                      <FormControlLabel value="1" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Tersedia" />
                      <FormControlLabel value="0" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Habis" />
                    </RadioGroup>
                  </div>
                  <div>
                    <FormControlLabel
                      value="start"
                      sx={{ ml: 0 }}
                      control={<Checkbox defaultChecked={menu.is_recommended === 1} style={{ color: "#ffc300" }} />}
                      label={<h4>Rekomendasi</h4>}
                      labelPlacement="start"
                    />
                  </div>
                </div>
                <div className={classes.right}>
                  <div>
                    <img className={classes.image} src={menu.image} alt="" variant="outlined" />
                    <BootstrapButton>Upload</BootstrapButton>
                  </div>
                  <div className={classes.navButton}>
                    <ControlButton>Reset</ControlButton>
                    <ControlButton>Hapus</ControlButton>
                    <ControlButton onClick={handleSaveButton}>Simpan</ControlButton>
                  </div>
                </div>
              </div>
            </Frame>
          </div>
        </div >
      }
    </Root >
  )
}

export default EditMenu;