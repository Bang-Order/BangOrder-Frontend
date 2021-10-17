import * as React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Cardlist from '../components/cardlist/Cardlist';
import axios from 'axios';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const Content = styled('div')(({ theme }) => ({
    marginLeft: 280,
    marginRight: 20,
    marginTop: 90,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
        marginLeft: 20,
    },
}));

const Root = styled('div')(() => ({
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
}))

const Antrian = (props) => {
    const [orders, setOrders] = useState(null);
    const [value, setValue] = React.useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/api/restaurants/1/orders?status='+value)
            .then((res) => {
                setOrders(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [value])

    return (
        <Root>
            <Sidebar index="1" name="Antrian"/>
            <Content>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value="" label="Semua" />
                    <BottomNavigationAction value="antri" label="Antri" />
                    <BottomNavigationAction value="dimasak" label="Dimasak" />
                </BottomNavigation>
                {loading ?
                    <p>loading...</p>
                    :
                    orders && orders.map(order =>
                        <Cardlist key={order.id} order={order} />
                    )
                }
                {error && <p>{error}</p>}
            </Content>
        </Root>
    );
}

export default Antrian;
