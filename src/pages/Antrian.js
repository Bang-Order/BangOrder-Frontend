import * as React from 'react';
import OrderCard from '../components/ordercard/OrderCard';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Cookies from 'js-cookie';
import firebase from '../utils/firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { Alert, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

const Content = styled('div')(({ theme }) => ({
    marginLeft: 280,
    marginRight: 20,
    marginTop: 65,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
    },
}));

const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    paddingTop: 20,
    minHeight: '100vh',
}))

const Antrian = () => {
    const [orders, setOrders] = useState(null);
    const [value, setValue] = useState("");
    const [error] = useState(null);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        const db = getDatabase(firebase);
        const orderRef = ref(db, "orders/" + Cookies.get("RestoId"))
        onValue(orderRef, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                data = Object.values(data);
                if (value) {
                    data = data.filter((el) => {
                        return el.order_status === value;
                    })
                } else {
                    data = data.filter((el) => {
                        return el.order_status === "antri" || el.order_status === "dimasak"
                    })
                }
                setOrders(Object.values(data));
            } else {
                setOrders("");
            }
        });
        setLoading(false);
    }, [value, update])

    const handleUpdate = () => {
        setUpdate(!update);
    }

    return (
        <Root>
            <Content>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{
                        color: "black",
                        '&& .Mui-selected, && .Mui-selected:hover': {
                            bgcolor: '#FFD755',
                            color: "black"
                        },
                        '&& .MuiBottomNavigationAction-label': {
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'manrope'
                        }
                    }}
                >
                    <BottomNavigationAction value="" label="Semua" />
                    <BottomNavigationAction value="antri" label="Antri" />
                    <BottomNavigationAction value="dimasak" label="Dimasak" />
                </BottomNavigation>
                {loading ?
                    <p>loading...</p>
                    :
                    orders && orders.length !== 0 ? orders.map(order =>
                        <OrderCard key={order.id} order={order} handleUpdate={handleUpdate} handleClick={handleClick}/>
                    ) : (
                        <h4 style={{ marginTop: 10 }}>Belum ada pesanan masuk</h4>
                    )
                }
                {error && <p>{error}</p>}
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert>
                        Pesanan selesai — Lihat <Link to="/riwayat">Riwayat</Link>
                    </Alert>
                </Snackbar>
            </Content>
        </Root >
    );
}

export default Antrian;
