import React, { useState, useEffect } from "react";
import { Button, InputAdornment, IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import './listmenu.css';
import MenuCard from '../MenuCard/MenuCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 20,
    textAlign: "left",
    display: "flex",
    flexWrap: "wrap",
  },
  header: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    float: 'left',
  },
  right: {
    justifyContent: 'space-between',
    height: 39,
    width: 200,
  },
}));

const ListMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menus, setMenus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  //unavailable, available, recomendation
  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurants/2/menus?filter='+statusFilter)
      .then((res) => {
        setMenus(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
  }, [statusFilter])

  const handleStatusClick = (status) => {
    setStatusFilter(status)
    setAnchorEl(null);
    console.log(statusFilter);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.left}>
          <TextField className="search" size="small" type="text" placeholder="Cari Menu"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end"><SearchIcon /></IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className={classes.right}>
          <Button className='dropdown' onClick={handleClick}>
            All Menu
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
                width: '150px',
                backgroundColor: "white",
              },
            }}
          >
            <MenuItem onClick={() => handleStatusClick("")}>All Menu</MenuItem>
            <MenuItem onClick={() => handleStatusClick("recommendation")}>Rekomendasi</MenuItem>
            <MenuItem onClick={() => handleStatusClick("available")}>Tersedia</MenuItem>
            <MenuItem onClick={() => handleStatusClick("unavailable")}>Habis</MenuItem>
          </Menu>
        </div>
      </div>
      <div className={classes.content}>
            {loading ?
              <p>loading..</p>
              :
              menus && menus.map(menu =>
                <MenuCard key={menu.id} menu={menu} />
              )
            }
      </div>
    </div>
  )


}

export default ListMenu;