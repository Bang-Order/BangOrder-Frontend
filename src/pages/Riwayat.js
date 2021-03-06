import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { InputBase, Pagination, Stack } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import HistoryCard from '../components/historycard/HistoryCard';
import { makeStyles } from '@mui/styles';
import { api } from '../utils/api';
import Cookies from 'js-cookie';

const useStyles = makeStyles(() => ({
	inputBase: {
		border: "2px solid #ffc300",
		borderRadius: 5,
		height: '5vh',
		padding: 5
	},
}))

const Content = styled('div')(({ theme }) => ({
	marginLeft: 260,
	marginRight: 20,
	marginTop: 50,
	padding: 15,
	paddingBottom: 20,
	[theme.breakpoints.down('md')]: {
		marginLeft: 20,
	},
}));

const Root = styled('div')(() => ({
	backgroundColor: '#f1f1f1',
	minHeight: '100vh',
	paddingTop: 20,
	paddingBottom: 30
}))

const Riwayat = () => {
	const [value, setValue] = useState([null, null]);
	const classes = useStyles();
	const [orders, setOrders] = useState();
	const [update, setUpdate] = useState(false);
	const [date, setDate] = useState(["", ""]);
	const [page, setPage] = useState(1);
	const rowPerPage = 5;
	useEffect(() => {
		api.get(Cookies.get("RestoId") + "/orders/history?start_date=" + date[0] + "&end_date=" + date[1], { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
			.then((res) => {
				setOrders(res.data.data);
			})
	}, [date])
	const handleUpdate = () => {
		setUpdate(!update);
	}
	const handleDate = (value) => {
		setValue(value)
		if (value[0] && value[1]) {
			setDate([
				value[0].getFullYear() + "-" + (value[0].getMonth() + 1) + "-" + value[0].getDate(),
				value[1].getFullYear() + "-" + (value[1].getMonth() + 1) + "-" + value[1].getDate(),
			])
		}
	}
	const handlePageChange = (page) => {
		setPage(page);
	}

	return (
		<div>
			<Root>
				<Content>
					<div style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateRangePicker
								disableFuture
								allowSameDateSelection="true"
								disableCloseOnSelect="false"
								value={value}
								onChange={(newValue) => {
									handleDate(newValue);
								}}
								renderInput={(startProps, endProps) => (
									<>
										<Box sx={{ mx: 2 }}> Dari </Box>
										<InputBase className={classes.inputBase} {...startProps} />
										<Box sx={{ mx: 2 }}> Sampai </Box>
										<InputBase className={classes.inputBase} {...endProps} />
									</>
								)}
							/>
						</LocalizationProvider>
					</div>
					{orders && orders.length !== 0 ?
						orders
							.slice((page - 1) * rowPerPage, (page - 1) * rowPerPage + rowPerPage)
							.map(order =>
								<HistoryCard key={order.id} order={order} handleUpdate={handleUpdate} />
							)
						:
						<h4 style={{ marginTop: 10 }}>Belum ada riwayat pesanan</h4>
					}
				{orders &&
					<Stack style={{ float: "right", marginRight: 30, paddingTop: 10, paddingBottom: 10 }}>
						<Pagination
							count={Math.ceil(orders.length / rowPerPage)}
							onChange={(evt, page) => { handlePageChange(page) }}
							variant="outlined"
							shape="rounded" />
					</Stack>
				}
				</Content>
			</Root>
		</div>
	);
}

export default Riwayat;