import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    Avatar,
    Toolbar,
    Menu,
    MenuItem,
    ListItem,
} from '@mui/material';
import {
    ViewList,
    Fastfood,
    EventSeat,
    RoomService,
    Home,
    History,
    MenuOutlined
} from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemIcon from '@mui/material/ListItemIcon';
import { makeStyles, withStyles } from '@mui/styles';
import { logout } from '../../utils/Auth';
import { NavLink, useHistory } from "react-router-dom";
import { api } from '../../utils/api';
import Cookies from 'js-cookie';

const drawerWidth = 260;
const useStyles = makeStyles(() => ({
    image: {
        width: '80%',
        height: 'auto',
        paddingTop: 20,
    },
    root: {
        backgroundColor: 'transparent'
    }
}));


const Sidebar = (props) => {
    const classes = useStyles();
    const { window } = props;
    const history = useHistory();
    const navIndex = props.index;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [resto, setResto] = useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const _onLogout = () => {
        logout();
        history.replace("/login");
    };
    useEffect(() => {
        api.get(Cookies.get("RestoId"), { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
            .then((res) => {
                console.log(res.data);
                setResto(res.data)
            })
    }, [])

    const CustomListItem = withStyles({
        root: {
            "&$selected:hover": {
                backgroundColor: "#FFD755",
                color: "white"
            },
            "&:hover": {
                backgroundColor: "#FFD755",
                color: "white",
            },
        },
        selected: {}
    })(ListItem);
    const drawer = (
        <div>
            <img src="/logo-horizontal.png" alt="" className={classes.image} />
            <Toolbar />
            <List className={classes.list} sx={{
                '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: '#ffc300'
                }
            }}>
                <NavLink to="/">
                    <CustomListItem selected={navIndex === 1}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <h4>Restoran</h4>
                    </CustomListItem>
                </NavLink>
                <NavLink to="/order-list">
                    <CustomListItem selected={navIndex === 2}>
                        <ListItemIcon><RoomService /></ListItemIcon>
                        <h4>Antrian</h4>
                    </CustomListItem>
                </NavLink>
                <NavLink to="/data-meja">
                    <CustomListItem selected={navIndex === 3}>
                        <ListItemIcon><EventSeat /></ListItemIcon>
                        <h4>Data Meja</h4>
                    </CustomListItem>
                </NavLink>
                <NavLink to="/kategori-menu">
                    <CustomListItem selected={navIndex === 4}>
                        <ListItemIcon><ViewList /></ListItemIcon>
                        <h4>Kategori Menu</h4>
                    </CustomListItem>
                </NavLink>
                <NavLink to="/list-menu">
                    <CustomListItem selected={navIndex === 5}>
                        <ListItemIcon><Fastfood /></ListItemIcon>
                        <h4>Menu Restoran</h4>
                    </CustomListItem>
                </NavLink>
                <NavLink to="/riwayat">
                    <CustomListItem selected={navIndex === 6}>
                        <ListItemIcon><History /></ListItemIcon>
                        <h4>Riwayat</h4>
                    </CustomListItem>
                </NavLink>
            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: 'white',
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuOutlined sx={{ color: 'black' }} />
                    </IconButton >
                    <h3>{props.name}</h3>
                    <IconButton sx={{ position: "absolute", right: '20px', ml: 2 }} onClick={handleClick} size="medium">
                        <Avatar sx={{ width: 50, height: 50 }} src={resto && resto.image && resto.image}>{resto && resto.name.charAt(0)}</Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => history.push('/akun')}>
                            Akun Saya
                        </MenuItem>
                        <MenuItem onClick={() => history.push('/ubah-sandi')}>
                            Ubah Kata Sandi
                        </MenuItem>
                        <MenuItem onClick={_onLogout}>
                            Keluar
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Sidebar;