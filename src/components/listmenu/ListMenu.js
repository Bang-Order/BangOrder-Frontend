import React, { useState, useEffect } from "react";
import { InputAdornment, IconButton, TextField, MenuItem, Select, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
import './listmenu.css';
import MenuCard from '../MenuCard/MenuCard';
import { Link } from "react-router-dom";
import useDidMountEffect from "../componentDidMount/useDidMountEffect";
import PrimaryButton from "../button/PrimaryButton";
import { api } from "../../utils/api";
import Cookies from "js-cookie";

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
    justifyContent: 'space-evenly',
    height: 39,
  },
  container: {
    width: "25%",
  }
}));

const ListMenu = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [menus, setMenus] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      api.get(Cookies.get("RestoId") + "/menus?filter=" + statusFilter)
        .then((res) => {
          setMenus(res.data.data);
          setLoading(false)
        })
        .catch(err => {
          console.log(err.response);
          setLoading(false)
        })
    }, 300);
  }, [statusFilter])

  useDidMountEffect(() => {
    setStatusFilter("");
    const searchMenu = () => {
      setLoading(true);
      api.get(Cookies.get("RestoId") + '/menus?search=' + searchKey)
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

  const handleChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div>
      <div className={classes.header}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={4}>
            <TextField onChange={(e) => setSearchKey(e.target.value)} className="search" size="small" type="text" placeholder="Cari Menu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end"><SearchIcon /></IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item sm={6} xs={8}>
            <div className={classes.right}>
              <Link to={"/tambah-menu"}>
                <PrimaryButton width='150px'>Tambah Menu</PrimaryButton>
              </Link>
              <Select
                value={statusFilter}
                onChange={handleChange}
                displayEmpty
                sx={{ width: '150px' }}
              >
                <MenuItem value="">Semua Menu</MenuItem>
                <MenuItem value="recommendation">Rekomendasi</MenuItem>
                <MenuItem value="available">Tersedia</MenuItem>
                <MenuItem value="unavailable">Habis</MenuItem>
              </Select>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.content}>

        {loading ?
          <Grid container spacing={2}>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
            </Grid>
          </Grid>
          :
          <Grid container spacing={2}>
            {menus && menus.map(menu =>
              <Grid item lg={3} sm={4} xs={12}>
                <Link to={"/edit-menu/" + menu.id}>
                  <MenuCard key={menu.id} menu={menu} />
                </Link>
              </Grid>
            )}
          </Grid>
        }
      </div>
    </div >
  )


}

export default ListMenu;