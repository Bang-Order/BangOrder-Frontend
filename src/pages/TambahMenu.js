import React, { useState, useEffect } from "react";
import Sidebar from '../components/sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { InputLabel, Button, Radio } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GET_RESTAURANT } from "../utils/Urls";
import { Menu, MenuItem } from "@mui/material";
import PrimaryButton from "../components/button/PrimaryButton";

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
	marginTop: 90,
	paddingBottom: 20,
	borderRadius: 7,
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
}))


const TambahMenu = () => {
	const classes = useStyles();
	const [menu, setMenu] = useState();
	const [image, setImage] = useState();
	const [allCategory, setAllCategory] = useState();
	const [anchorEl, setAnchorEl] = useState(null);
	const [isRecommended, setIsRecommended] = useState();
	const restoId = localStorage.getItem("RestoId");
	const history = useHistory();

	useEffect(() => {
		axios.get(GET_RESTAURANT + restoId + '/menu-categories')
			.then((res) => {
				setAllCategory(res.data.data);
			})
	}, [restoId])

	const handleSaveButton = () => {
		axios.post(GET_RESTAURANT + restoId + '/menus/', menu, { headers: { Authorization: 'Bearer ' + localStorage.getItem("TOKEN") } })
			.then(history.push("/list-menu"));
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (evt) => {
		const value = evt.target.value;
		setMenu(prevState => ({
			...prevState,
			[evt.target.name]: value
		}));
	}

	const handleCategoryChange = (id, name) => {
		setMenu(prevState => ({
			...prevState,
			menu_category_id: id,
			menu_category: name
		}));
		setAnchorEl(null);
	}

	const handleRecommendationChange = (value) => {
		setIsRecommended(value);
		setMenu(prevState => ({
			...prevState,
			is_recommended: value,
		}));
	}

	const handleImageChange = (event) => {
		setImage(URL.createObjectURL(event.target.files[0]));
	}

	return (
		<Root>
			<div>
				<Sidebar index="4" name="Tambah Menu" />
				<div>
					<Frame>
						<div className={classes.content}>
							<div className={classes.left}>
								<div className={classes.item}>
									<FormControl variant="standard">
										<InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Nama Menu
										</InputLabel>
										<BootstrapInput
											onChange={handleChange}
											placeholder="Nama menu"
											id="bootstrap-input"
											name="name"
										/>
									</FormControl>
								</div>
								<div className={classes.item}>
									<FormControl variant="standard" font-size="24px">
										<InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Harga Menu
										</InputLabel>
										<BootstrapInput
											onChange={handleChange}
											placeholder="Harga menu"
											id="bootstrap-input"
											name="price"
										/>
									</FormControl>
								</div>
								<div className={classes.item}>
									<FormControl variant="standard" font-size="24px">
										<InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
											Kategori Menu
										</InputLabel>
										<Button style={{ width: 250, marginTop: 30 }} className='dropdown' onClick={handleClick}>
											{menu && menu.menu_category ? menu.menu_category : "--pilih kategori menu--"}
											<ArrowDropDownIcon />
										</Button>
										<Menu
											id="filter-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
											PaperProps={{
												style: {
													width: '250px',
													backgroundColor: "white",
												},
											}}
										>
											{allCategory && allCategory.map(category =>
												<MenuItem key={category.id} onClick={() => handleCategoryChange(category.id, category.name)} >{category.name}</MenuItem>
											)}
										</Menu>
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
									<img className={classes.image} src={image ? image : 'thumbnail.svg'} alt="" variant="outlined" />
									<label htmlFor="contained-button-file">
										<Input onChange={handleImageChange} accept="image/*" id="contained-button-file" multiple type="file" />
										<PrimaryButton width="100%" component="span">
											Upload
										</PrimaryButton>
									</label>
								</div>
								<div className={classes.navButton}>
									<PrimaryButton width="100px" onClick={handleSaveButton}>Simpan</PrimaryButton>
								</div>
							</div>
						</div>
					</Frame>
				</div>
			</div >
		</Root >

	);
}
export default TambahMenu;