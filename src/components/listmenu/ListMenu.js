import React, { useState, useEffect } from "react";
import { Button, InputAdornment, IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import './listmenu.css';
import MenuCard from '../MenuCard/MenuCard';
import { Link } from "react-router-dom";
import useDidMountEffect from "../componentDidMount/useDidMountEffect";
import PrimaryButton from "../button/PrimaryButton";
import { api } from "../../utils/api";

const useStyles = makeStyles(() => ({
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
    display: 'flex',
    justifyContent: 'space-between',
    height: 39,
    width: "30%",
  },
  container: {
    width: "25%",
  }
}));

const ListMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [menus, setMenus] = useState();
  useEffect(() => {
    setTimeout(() => {
      api.get("/menus?filter="+statusFilter)
      .then((res) => {
        setMenus(res.data.data);
        setLoading(false)
      })
      .catch(err => {
        setError(err.message);
        setLoading(false)
      })
    }, 100);
  }, [statusFilter])

  useDidMountEffect(() => {
    const searchMenu = () => {
      setLoading(true);
      api.get('/menus?search=' + searchKey)
        .then((res) => {
          setMenus(res.data.data);
          setLoading(false);
        })
    };
    const timerId = setTimeout(() => {
      searchMenu();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchKey]);

  const handleStatusClick = (status) => {
    setStatusFilter(status)
    setAnchorEl(null);
    api.get('/menus?filter=' + statusFilter)
      .then((res) => {
        setMenus(res.data.data);
      })
      .catch(err => {
        setError(err.message);
      })
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
          <TextField onChange={(e) => setSearchKey(e.target.value)} className="search" size="small" type="text" placeholder="Cari Menu"
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
          <Link to={"/tambah-menu"}>
            <PrimaryButton>Tambah Menu</PrimaryButton>
          </Link>
          <Button onClick={handleClick} className="dropdown">
            {statusFilter ? statusFilter : "All Menu"}
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
            <MenuItem onClick={() => handleStatusClick("recommendation")}>Recommendation</MenuItem>
            <MenuItem onClick={() => handleStatusClick("available")}>Available</MenuItem>
            <MenuItem onClick={() => handleStatusClick("unavailable")}>Unavailable</MenuItem>
          </Menu>
        </div>
      </div>
      <div className={classes.content}>

        {loading ?
          <div className={classes.container}>
            <Skeleton sx={{ width: "90%", height: 300 }} animation="wave" variant="rectangular" />
          </div>
          :
          menus && menus.map(menu =>
            <Link to={"/edit-menu/" + menu.id} className={classes.container}>
              <MenuCard key={menu.id} menu={menu} />
            </Link>
          )
        }
      </div>
    </div >
  )


}

export default ListMenu;