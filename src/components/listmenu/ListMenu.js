import React from "react";
import { Card, Grid, Button, InputAdornment, IconButton, TextField, Menu, MenuItem } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import './listmenu.css';


const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 20,
    textAlign: "left",
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
    width: '47%',
    float: 'left',
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 39,
    width: '45%',
    float: 'right',
  },
}));

const ListMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


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
                width: '200px',
                backgroundColor: '#FFC300',
              },
            }}
          >
            <MenuItem onClick={handleClose}>All Menu</MenuItem>
            <MenuItem onClick={handleClose}>Rekomendasi</MenuItem>
            <MenuItem onClick={handleClose}>Tersedia</MenuItem>
            <MenuItem onClick={handleClose}>Habis</MenuItem>
          </Menu>
        </div>
      </div>
      <div className={classes.content}>
        <Grid container spacing="12">
          <Grid item xs="6" md="3">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/cemilan/cheese-burger.jpg"
                  alt="Cheese Burger"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Cheese Burger
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rp20.000
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  )


}

export default ListMenu;