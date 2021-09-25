import React from 'react';
import {Drawer, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { ViewList, Fastfood, History } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 330;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        marginTop: 52,
        minHeight: 30,
    },
    drawerContainer: {
        marginTop: 10,
        marginLeft: 54,

    }
}));

const Sidebar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <h2 className={classes.title}>
                    Cafe Sejenak
                </h2>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary='Restoran' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText secondary='Data Meja' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText secondary='Ubah Password' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ViewList /></ListItemIcon>
                            <ListItemText primary='Antrian' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Fastfood /></ListItemIcon>
                            <ListItemText primary='Menu Makanan' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText secondary='Kategori Menu' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><History /></ListItemIcon>
                            <ListItemText primary='History' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Sidebar;