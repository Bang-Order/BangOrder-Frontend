import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Menu, MenuItem } from '@mui/material';
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

const OrderCard = (props) => {
	const classes = useStyles();
	const order = props.order;
	const orderItem = props.order.order_items;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [status, setStatus] = React.useState(order.order_status);
	const handleUpdate = props.handleUpdate;
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleStatus = (status) => {
		handleClose();
		setStatus(status);
		api
			.patch(Cookies.get("RestoId")+'/orders/' + order.id, {
				"order_status": status,
				"payment_status": "success"
			}, { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } });
		setTimeout(() => {
			handleUpdate();
		}, 300);
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
							Status :
						</h4>
						<Button width="150px" onClick={handleClick} className="dropdown">
							{status}
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
							<MenuItem onClick={() => handleStatus('antri')}>Antri</MenuItem>
							<MenuItem onClick={() => handleStatus('dimasak')}>Dimasak</MenuItem>
						</Menu>
						<PrimaryButton width='150px' onClick={() => handleStatus('selesai')}>Selesai</PrimaryButton>
					</div>
				</CardContent>
				{orderItem &&
					orderItem.map(item =>
						<div key={item.name} className={classes.content}>
							<div className={classes.item}>
								<h4>{item.quantity}x {item.name}</h4>
								<h4>{item.price}</h4>
							</div>
							<h5>Catatan : {item.notes}</h5>
							<Divider />
						</div>
					)}

				<div className={classes.total}>
					<h4>Total harga : </h4>
					<h4>{order.total_price}</h4>
				</div>
			</div>
		</Card>
	);
}

export default OrderCard;