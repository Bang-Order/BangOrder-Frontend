import * as React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import {
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    Alert,
    Paper,
    Button,
    Grid,
    Box
} from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import PrimaryButton from '../components/button/PrimaryButton'
import axios from 'axios';

const useStyle = makeStyles({
    paperStyle: {
        padding: 20,
        height: 'auto',
        width: '80%',
        margin: 'auto',
    }
})
const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#989999',
    fontWeight: 'bold',
})

const Register = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEmailNull, setIsEmailNull] = React.useState(false);
    const [isPasswordNull, setIsPasswordNull] = React.useState(false);
    const [isConfirmPasswordNull, setIsConfirmPasswordNull] = React.useState(false);
    const history = useHistory();
    const classes = useStyle();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const _onSubmit = () => {
        setError(false);
        if (email === "") {
            setIsEmailNull(true);
        }
        if (password === "") {
            setIsPasswordNull(true);
        }
        if (confirmPassword === "") {
            setIsConfirmPasswordNull(true);
        } else {
            axios.post(process.env.REACT_APP_API_URL + 'auth/register/account', {
                email: email,
                password: password,
                confirm_password: confirmPassword
            })
                .then((res) => {
                    history.push({
                        pathname: "/form",
                        state: res.data.data
                    });
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                    setError(err.response.data);
                })
        }
    }

    return (
        <div>
            <Grid container spacing={0}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "100vh" }}>
                <Grid item sm={6} component={Box} display={{ xs: "none", xl: "flex" }}>
                    <img style={{ height: '100vh', width: 'auto', padding: 0 }} src="/tabletent1.png" alt="" />
                    <div style={{ position: "absolute", marginLeft: 10, bottom: 10 }}>
                        <a href='https://play.google.com/store/apps/details?id=com.bangorder.mobile' rel="noreferrer" target='_blank'>
                            <img style={{ height: '8vh', width: 'auto' }} src='/playstore.png' alt='' />
                        </a>
                    </div>
                </Grid>
                <Grid item xl={6} xs={12}>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <h2 style={{ float: 'left' }}>Daftar</h2>
                        {error && <Alert sx={{ marginTop: "30px" }} severity="error">{error.errors.email || error.errors.password || error.errors.confirm_password}</Alert>}
                        <TextField
                            label="Email"
                            id="outlined-size-small"
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            error={isEmailNull ? true : false}
                            required={isEmailNull ? true : false}
                        />
                        <FormControl
                            fullWidth
                            variant="outlined" margin="normal"
                            error={isPasswordNull ? true : false}
                            required={isPasswordNull ? true : false}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-password-input"
                                label="Password"
                                type={!showPassword ? "password" : "text"}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            variant="outlined" margin="normal"
                            error={isConfirmPasswordNull ? true : false}
                            required={isConfirmPasswordNull ? true : false}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Konfirmasi Password</InputLabel>
                            <OutlinedInput
                                id="outlined-password-input"
                                label="Konfirmasi Password"
                                type={!showPassword ? "password" : "text"}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div>
                            <PrimaryButton onClick={_onSubmit} width="100%" style={{ marginTop: 20 }}>Daftar</PrimaryButton>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p >Sudah punya akun? &nbsp;</p>
                            <p><StyledLink to="/login" >Masuk</StyledLink></p>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Register;