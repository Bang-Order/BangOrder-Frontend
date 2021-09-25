import React from "react";
import { Button, MenuItem, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    topbar: {
        height: 50,
        position: 'sticky',
        top: 0,
        marginLeft: 330,
        zIndex: 999,
    },
    
    topbarWrapper: {
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999,
    },
    
    topRight: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const Topbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div className={classes.topbar}>
            <div className={classes.topbarWrapper}>
                <div>
                    <h3>Daftar Antrean</h3>
                </div>
                <div className={classes.topRight}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Topbar;