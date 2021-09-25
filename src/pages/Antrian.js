import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import Cardlist from '../components/cardlist/Cardlist';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    content: {
        marginLeft: 360,
        marginRight: 20,
        marginTop: 50,
    },
}));

const Antrian = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3008/api/order')
            .then(res => setOrders(res.data))
    }, [])

    return (
        <div>
            <Sidebar />
            <Topbar />
            {/* {orders && */}
                <div className={classes.content}>
                    {/* {orders.map(order => */}
                        <Cardlist order={orders} />
                        <Cardlist order={orders} />
                        <Cardlist order={orders} />
                        <Cardlist order={orders} />
                    {/* )} */}
                </div>
            {/* } */}
        </div>
        // <Cardlist />
    );
}

export default Antrian;
