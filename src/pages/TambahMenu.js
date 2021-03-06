import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { InputLabel, Button, Radio, ListItem, Tooltip, ListItemIcon, Select } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";
import { MenuItem } from "@mui/material";
import PrimaryButton from "../components/button/PrimaryButton";
import { api } from "../utils/api";
import Cookies from "js-cookie";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
	content: {
		display: 'flex',
		flexDirection: 'row',
		textAlign: 'left',
		marginLeft: 50,
		marginRight: 25,
		paddingTop: 20,
	},
	item: {
		marginTop: 20,
		width: "100%"
	},
	image: {
		width: "100%",
		minWidth: "400px",
		height: 'auto',
		marginTop: 20
	},
	left: {
		display: 'flex',
		flexDirection: 'column',
		width: '60%',
	},
	right: {
		width: '40%',
		marginRight: 20,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: "space-between"
	},
	navButton: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row-reverse",
		width: '80%',
		marginTop: 20
	}
}));

const Input = styled('input')({
	display: 'none',
});

const Frame = styled('div')(({ theme }) => ({
	backgroundColor: "#ffffff",
	marginLeft: 280,
	marginRight: 20,
	marginTop: 65,
	paddingBottom: 20,
	[theme.breakpoints.down('md')]: {
		marginLeft: 20,
	},
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(4),
	},
	'& .MuiInputBase-input': {

		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
		border: '1px solid #ced4da',
		fontSize: 14,
		width: '300px',
		padding: '10px 12px',
	},
}));

const Root = styled('div')(() => ({
	backgroundColor: '#f1f1f1',
	height: '100vh',
	paddingTop: 20,
}))
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TambahMenu = () => {
	const classes = useStyles();
	const [menu, setMenu] = useState({ 'name': "", 'price': "", 'menu_category_id': "" });
	const [image, setImage] = useState();
	const [allCategory, setAllCategory] = useState();
	const [isRecommended, setIsRecommended] = useState();
	const [error, setError] = useState();
	const history = useHistory();
	const [saving, setSaving] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		api.get(Cookies.get("RestoId") + '/menu-categories', { headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") } })
			.then((res) => {
				setAllCategory(res.data.data);
			})
	}, [error])

	const handleSaveButton = () => {
		setSaving(true);
		let formData = new FormData();
		if (image) {
			formData.append('image', image);
		}
		for (var key in menu) {
			formData.append(key, menu[key]);
		}
		api.post(Cookies.get("RestoId") + '/menus/', formData, {
			headers: {
				'Content-Type': 'application/form-data; ',
				Authorization: 'Bearer ' + Cookies.get("BangOrderToken")
			}
		})
			.then(() => {
				setSaving(false);
				history.push("/list-menu");
			})
			.catch((err) => {
				console.log(err.response.data.message);
				setError(err.response.data);
				setSaving(false);
			})
	}

	const handleChange = (evt) => {
		const value = evt.target.value;
		setMenu(prevState => ({
			...prevState,
			[evt.target.name]: value
		}));
	}

	const handleCategoryChange = (evt) => {
		setMenu(prevState => ({
			...prevState,
			menu_category_id: evt.target.value,
		}));
	}

	const handleRecommendationChange = (value) => {
		setIsRecommended(value);
		setMenu(prevState => ({
			...prevState,
			is_recommended: value,
		}));
	}

	const handleImageChange = (evt) => {
		setImage(evt.target.files[0]);
		setMenu(prevState => ({
			...prevState,
			image: image
		}));
	}

	const handleTooltipClose = () => {
		setOpen(false);
	}

	const handleTooltipOpen = () => {
		setOpen(true);
	}
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(null);
	};

	return (
		<Root>
			<div>
				<div>
					<Frame>
						<div className={classes.content}>
							<div className={classes.left}>
								<div className={classes.item}>
									<FormControl variant="standard">
										<InputLabel required shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Nama Menu
										</InputLabel>
										<BootstrapInput
											onChange={handleChange}
											placeholder="Nama menu"
											id="bootstrap-input"
											name="name"
											required
										/>
									</FormControl>
								</div>
								<div className={classes.item}>
									<FormControl variant="standard" font-size="24px">
										<InputLabel required shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Harga Menu
										</InputLabel>
										<BootstrapInput
											onChange={handleChange}
											placeholder="Harga menu"
											id="bootstrap-input"
											name="price"
											required
										/>
									</FormControl>
								</div>
								<div className={classes.item}>
									<FormControl font-size="24px">
										<InputLabel required shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Kategori Menu
										</InputLabel>
										<Select
											value={menu.menu_category_id}
											onChange={handleCategoryChange}
											displayEmpty
											sx={{ width: '200px', marginTop: "20px" }}
										>
											<MenuItem value="">Pilih Kategori Menu</MenuItem>
											{allCategory && allCategory.map(category =>
												<MenuItem value={category.id}>{category.name}</MenuItem>
											)}
										</Select>
								</FormControl>
							</div>
							<div className={classes.item}>
								<FormControl variant="standard" font-size="24px">
									<InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
										Deskripsi Menu
									</InputLabel>
									<BootstrapInput
										onChange={handleChange}
										placeholder="Deskripsi Menu"
										id="bootstrap-input"
										multiline
										minRows={3}
										style={{ width: '330px' }}
										name="description"
									/>
								</FormControl>
							</div>
							<div className={classes.item}>
								<h4>Status Makanan</h4>
								<RadioGroup onChange={handleChange} name="is_available">
									<FormControlLabel value="1" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Tersedia" />
									<FormControlLabel value="0" control={<Radio size="small" style={{ color: '#FFC300' }} />} label="Habis" />
								</RadioGroup>
							</div>
							<div>
								<FormControlLabel
									value="start"
									sx={{ ml: 0 }}
									onClick={() => handleRecommendationChange(isRecommended === 1 ? 0 : 1)}
									control={<Checkbox checked={isRecommended === 1} style={{ color: "#ffc300" }} />}
									label={<h4>Rekomendasi</h4>}
									labelPlacement="start"
								/>
							</div>
						</div>
						<div className={classes.right}>
							<div>
								<img className={classes.image} src={image ? URL.createObjectURL(image) : 'thumbnail.svg'} alt="" variant="outlined" />
								<label htmlFor="contained-button-file">
									<Input onChange={handleImageChange} accept="image/*" id="contained-button-file" multiple type="file" name="image" />
									<ListItem>
										<PrimaryButton width="100%" component="span">
											Upload
										</PrimaryButton>
										<ClickAwayListener onClickAway={handleTooltipClose}>
											<Tooltip
												PopperProps={{
													disablePortal: true,
												}}
												onClose={handleTooltipClose}
												open={open}
												disableFocusListener
												disableHoverListener
												disableTouchListener
												title="Gunakan foto berekstensi jpg/png dengan rasio 1:1 (MAX 1 MB)">
												<ListItemIcon>
													<Button>
														<InfoOutlinedIcon style={{ marginLeft: 20 }} onClick={handleTooltipOpen} />
													</Button>
												</ListItemIcon>
											</Tooltip>
										</ClickAwayListener>
									</ListItem>
								</label>
							</div>
							<div className={classes.navButton}>
								<PrimaryButton loading={saving} width="100px" onClick={handleSaveButton}>Simpan</PrimaryButton>
							</div>
						</div>
				</div>
				<Snackbar open={error} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
					<Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
						{error && (error.errors ? (error.errors.name ||
							error.errors.price ||
							error.errors.image)
							: error.message)}
					</Alert>
				</Snackbar>
			</Frame>
		</div>
			</div >
		</Root >

	);
}
export default TambahMenu;