import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import './cardlist.css';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        marginTop: 20,
        // marginBottom: 20,
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    left: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '10%',
        minWidth: 160,
    },
    right: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '40%',
        minWidth: 370,
        maxWidth: 390,
        marginRight: 20,
    },
    content: {
        textAlign: 'left',
        marginLeft: 20,
        marginRight: 40,
        marginTop: 10,
        marginBottom: 10,
    },
    meja: {
        margin: 0,
        width: 50,
    },
    id: {
        margin: 0,
        width: 90,
    },
    button: {
        borderRadius: 7,
        border: 0,
        height: 60,
        width: 586,
        padding: '0 30px',
        fontSize: '24px',
        marginTop: '193px'
    },
    done: {
        width: 146,
        backgroundColor: '#FFC300',
        position: 'absolute',
        bottom: 21,
        right: 15,
        zIndex: 2,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    total: {
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: 40,
        marginBottom: 20,
        marginTop: 20,
        width: 170,
    }
}));

const Cardlist = (order) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.header}>
                    <div className={classes.left}>
                        <h4 className={classes.meja}>
                            Meja 10
                        </h4>
                        <h4 className={classes.id}>
                            Id Pesanan 8989889
                        </h4>
                    </div>
                    <div className={classes.right}>
                        <h4>
                            Status :
                        </h4>
                        <Button className='dropdown' onClick={handleClick}>
                            Antri
                            <ArrowDropDownIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    width: '150px',
                                },
                            }}
                        >
                            <MenuItem onClick={handleClose}>Antri</MenuItem>
                            <MenuItem onClick={handleClose}>Dibuat</MenuItem>
                            <MenuItem onClick={handleClose}>Diantar</MenuItem>
                        </Menu>
                        <Button className='done'>
                            Done
                        </Button>
                    </div>
                </CardContent>
                <div className={classes.content}>
                    <div className={classes.item}>
                        <h4 >
                            Batagor 2x
                        </h4>
                        <h4 >
                            10000
                        </h4>
                    </div>
                    <h5 style={{ margin: 0 }}>
                        Catatan : lorem lorem
                    </h5>
                </div>
                <Divider variant="middle" />
                <div className={classes.content}>
                    <div className={classes.item}>
                        <h4 >
                            Batagor 2x
                        </h4>
                        <h4 >
                            10000
                        </h4>
                    </div>
                    <h5 style={{ margin: 0 }}>
                        Catatan : lorem lorem
                    </h5>
                </div>
                <Divider variant="middle" />
                <div className={classes.total}>
                    <h4>Total harga : </h4>
                    <h4>20000</h4>
                </div>
            </div>
        </Card>
    );
}

export default Cardlist;