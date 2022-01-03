import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, MenuItem, Select } from '@mui/material';
import Divider from '@mui/material/Divider';
import './cardlist.css';
import PrimaryButton from '../button/PrimaryButton';
import { api } from '../../utils/api';
import Cookies from 'js-cookie';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		marginTop: 20,
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
		width: 40,
	},
	id: {
		margin: 0,
		width: 90,
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
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	total: {
		alignSelf: 'flex-end',
		display: 'flex',
		justifyContent: 'space-between',
		marginRight: 40,
		marginBottom: 20,
		marginTop: 20,
		minWidth: '10%',
		maxWidth: '50%',
	},
	fontStyle: {
		fontWeight: 'normal',
	}
}));

const OrderCard = (props) => {
	const classes = useStyles();
	const order = props.order;
	const orderItem = props.order.order_items;
	const [status, setStatus] = React.useState(order.order_status);
	const handleUpdate = props.handleUpdate;
	const handleClick = props.handleClick;

	const handleStatus = (evt) => {
		setStatus(evt.target.value);
		api
			.patch(Cookies.get("RestoId") + '/orders/' + order.id, {
				"order_status": evt.target.value,
				"payment_status": "success"
			}, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } });
		setTimeout(() => {
			handleUpdate();
		}, 500);
	}
	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.header}>
					<div className={classes.left}>
						<h4 className={classes.meja}>
							Meja {order.table_number}
						</h4>
						<h4 className={classes.id}>
							Id Pesanan {order.id}
						</h4>
					</div>
					<div className={classes.right}>
						<h4>
							Status:
						</h4>
						&ensp;
						<Select
							value={status}
							onChange={handleStatus}
							displayEmpty
							sx={{ width: '150px', height: "50px"}}
						>
							<MenuItem value="antri">Antri</MenuItem>
							<MenuItem value="dimasak">Dimasak</MenuItem>
						</Select>
						<PrimaryButton width='150px' value="selesai" onClick={(event) => {handleStatus(event); handleClick()}}>Selesai</PrimaryButton>
					</div>
				</CardContent>
				{orderItem &&
					orderItem.map(item =>
						<div key={item.name} className={classes.content}>
							<div className={classes.item}>
								<h4>{item.quantity}x&ensp; {item.name}</h4>
								<h4>{item.price}</h4>
							</div>
							{item.notes && <h5 className={classes.fontStyle}>Catatan : {item.notes}</h5>}
							<Divider style={{ marginTop: 10 }} />
						</div>
					)}

				<div className={classes.total}>
					<h4>Total harga: &ensp;</h4>
					<h4>{order.total_price}</h4>
				</div>
			</div>
		</Card>
	);
}

export default OrderCard;