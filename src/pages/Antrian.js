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
    ".Mui-selected": {
        color: "red"
    },
    ".MuiBottomNavigationAction-label": {
        
    }
}))

const Antrian = () => {
    const [orders, setOrders] = useState(null);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        axios.get('http://localhost:3008/api/order')
            .then(res => setOrders(res.data))
    }, [])

    return (
        <Root>
            <Sidebar />
            {/* {orders && */}
            <Content>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value="all" label="Semua" />
                    <BottomNavigationAction value="queue" label="Antri" />
                    <BottomNavigationAction value="cooking" label="Dibuat" />
                </BottomNavigation>
                {/* {orders.map(order => */}
                <Cardlist order={orders} />
                <Cardlist order={orders} />
                <Cardlist order={orders} />
                <Cardlist order={orders} />
                {/* )} */}
            </Content>
            {/* } */}
        </Root>
        // <Cardlist />
    );
}

export default Antrian;
