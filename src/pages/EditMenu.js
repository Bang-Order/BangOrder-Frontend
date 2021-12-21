import React, { useState, useEffect } from "react";
import Sidebar from '../components/sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { InputLabel, Button, Radio, ListItem, Tooltip, ListItemIcon, Snackbar, Alert } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import PrimaryButton from "../components/button/PrimaryButton";
import SecondaryButton from "../components/button/SecondaryButton";
import { api } from "../utils/api";
import Cookies from "js-cookie";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';


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
    minWidth: "400px",
    marginTop: 20,
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
    justifyContent: "space-between",
    width: '80%',
    marginTop: 20
  }
}));

const Input = styled('input')({
  display: 'none',
});

const Frame = styled('div')(({ theme }) => ({
  backgroundColor: "#fff",
  marginLeft: 280,
  marginRight: 20,
  marginTop: 90,
  paddingBottom: 20,
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
    width: '300px',
    padding: '10px 12px',
  },
}));

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  height: '100vh',
}))

const EditMenu = (props) => {
  const classes = useStyles();
  const menuId = props.match.params.menuId;
  const [saving, setSaving] = useState(false);
  const [menu, setMenu] = useState();
  const [error, setError] = useState();
  const [allCategory, setAllCategory] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRecommended, setIsRecommended] = useState();
  const [isReset, setIsReset] = useState(false);
  const history = useHistory();
  const [image, setImage] = useState();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    api.get(Cookies.get("RestoId") + '/menus/' + menuId)
      .then((res) => {
        setMenu(res.data);
        setIsRecommended(res.data.is_recommended);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [menuId, isReset])

  useEffect(() => {
    api.get(Cookies.get("RestoId") + '/menu-categories')
      .then((res) => {
        setAllCategory(res.data.data);
      })
  }, [])

  const handleSaveButton = () => {
    setSaving(true);
    let formData = new FormData();
    for (var key in menu) {
      formData.append(key, menu[key]);
    }
    formData.delete('image');
    if (image) {
      formData.append('image', image);
    }
    api.post(Cookies.get("RestoId") + '/menus/' + menuId + '?_method=PUT', formData, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get("BangOrderToken"),
        'Content-Type': 'application/form-data; ',
      }
    })
      .then(() => {
        setSaving(false);
        history.push("/list-menu");
      })
      .catch((err) => {
        setError(err.response.data.errors);
        setSaving(false);
      })
  }
  const handleReset = () => {
    setIsReset(!isReset);
  }
  const handleDelete = () => {
    api.delete(Cookies.get("RestoId") + '/menus/' + menuId)
      .then(history.push("/list-menu"));
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setMenu(prevState => ({
      ...prevState,
      [evt.target.name]: value
    }));
  }

  const handleCategoryChange = (id, name) => {
    setMenu(prevState => ({
      ...prevState,
      menu_category_id: id,
      menu_category: name
    }));
    setAnchorEl(null);
  }

  const handleRecommendationChange = (value) => {
    setIsRecommended(value);
    setMenu(prevState => ({
      ...prevState,
      is_recommended: value,
    }));
  }

  const handleImageChange = (evt) => {
    setImage(evt.target.files[0]);
    setMenu(prevState => ({
      ...prevState,
      image: image
    }));
  }

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

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
                        onChange={handleChange}
                        value={menu.name}
                        placeholder="Nama menu"
                        id="bootstrap-input"
                        name="name"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Harga Menu
                      </InputLabel>
                      <BootstrapInput
                        onChange={handleChange}
                        value={menu.price}
                        placeholder="Harga menu"
                        id="bootstrap-input"
                        name="price"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Kategori Menu
                      </InputLabel>
                      <Button style={{ width: 250, marginTop: 30 }} className='dropdown' onClick={handleClick}>
                        {menu.menu_category}
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
                          <MenuItem key={category.id} onClick={() => handleCategoryChange(category.id, category.name)} >{category.name}</MenuItem>
                        )}
                      </Menu>
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <FormControl variant="standard" font-size="24px">
                      <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                        Deskripsi Menu
                      </InputLabel>
                      <BootstrapInput
                        onChange={handleChange}
                        defaultValue={menu.description}
                        placeholder="Deskripsi Menu"
                        id="bootstrap-input"
                        multiline
                        minRows={3}
                        style={{ width: '330px' }}
                        name="description"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.item}>
                    <h4>Status Makanan</h4>
                    <RadioGroup onChange={handleChange} value={menu.is_available} name="is_available">
                      <FormControlLabel value="1" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Tersedia" />
                      <FormControlLabel value="0" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Habis" />
                    </RadioGroup>
                  </div>
                  <div>
                    <FormControlLabel
                      value="start"
                      sx={{ ml: 0 }}
                      onClick={() => handleRecommendationChange(isRecommended === 1 ? 0 : 1)}
                      control={<Checkbox checked={isRecommended === 1} style={{ color: "#ffc300" }} />}
                      label={<h4>Rekomendasi</h4>}
                      labelPlacement="start"
                      name="is_recommended"
                    />
                  </div>
                </div>
                <div className={classes.right}>
                  <div>
                    <img className={classes.image} src={image ? URL.createObjectURL(image) : menu.image} alt="" />
                    <label htmlFor="contained-button-file">
                      <Input onChange={handleImageChange} accept="image/*" id="contained-button-file" multiple type="file" />
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
                                <InfoOutlinedIcon style={{ marginLeft: 20 }} onClick={handleTooltipOpen} />
                              </Button>
                            </ListItemIcon>
                          </Tooltip>
                        </ClickAwayListener>
                      </ListItem>
                    </label>
                  </div>
                  <div className={classes.navButton}>
                    <SecondaryButton width="100px" onClick={handleReset}>Reset</SecondaryButton>
                    <SecondaryButton width="100px" onClick={handleDelete}>Hapus</SecondaryButton>
                    <PrimaryButton loading={saving} width="100px" onClick={handleSaveButton}>Simpan</PrimaryButton>
                  </div>
                  <Snackbar open={error} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                      {error && (error.name ||
                        error.price ||
                        error.image)}
                    </Alert>
                  </Snackbar>
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