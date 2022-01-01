import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import {
    Alert,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
    IconButton,
    InputAdornment,
    TextField,
    Divider,
    Paper,
    Button,
    Grid
} from '@mui/material';
import { isLogin, login } from "../utils/Auth";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Box } from '@mui/system';

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
    fontWeight: 'bold'
})

const Login = () => {
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState();
    const [email, setEmail] = React.useState("");
    const [remember, setRemember] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEmailNull, setIsEmailNull] = React.useState(false);
    const [isPasswordNull, setIsPasswordNull] = React.useState(false);
    const history = useHistory();
    const classes = useStyle();
    const [loadingButton1, setLoadingButton1] = React.useState(false);
    const [loadingButton2, setLoadingButton2] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const _onSubmit = () => {
        if (email === "") {
            setIsEmailNull(true);
        } else if (password === "") {
            setIsPasswordNull(true);
        } else {
            setLoadingButton1(true);
            axios.post(process.env.REACT_APP_API_URL + 'auth/login', {
                email: email,
                password: password
            }).then((res) => {
                login(res.data.data, remember);
                if (isLogin) {
                    history.push("/order-list");
                }
            }).catch((err) => {
                if (err.response.status === 403) {
                    history.push({
                        pathname: "/belum-verifikasi",
                        state: {
                            email: email,
                            password: password,
                            access_token: err.response.data.data.access_token
                        }
                    });
                }
                setError(err.response.data.message);
                setLoadingButton1(false);
            })
        }
    }

    const onDemoLogin = () => {
        setLoadingButton2(true);
        axios.post(process.env.REACT_APP_API_URL + 'auth/login', {
            email: "resto_abc@gmail.com",
            password: "12345678"
        }).then((res) => {
            login(res.data.data, remember);
            if (isLogin) {
                history.push("/order-list");
            }
        }).catch((err) => {
            setError(err.response.data.message);
            setLoadingButton2(false);
        })
    }
    const handleRemember = (value) => {
        setRemember(value);
    }

    return (
        <div>
            <Grid container spacing={0}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{height: "100vh"}}>
                <Grid item sm={6} component={Box} display={{ xs: "none", xl: "flex" }}>
                    <img style={{ height: '100vh', width: 'auto', padding: 0 }} src='/tabletent1.png' alt='' />
                    <div style={{ position: "absolute", marginLeft: 10, bottom: 10 }}>
                        <a href='https://play.google.com/store/apps/details?id=com.bangorder.mobile' rel="noreferrer" target='_blank'>
                            <img style={{ height: '8vh', width: 'auto' }} src='/playstore.png' alt='' />
                        </a>
                    </div>
                </Grid>
                <Grid item xl={6} xs={12}>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <h2 style={{ float: 'left' }}>Masuk</h2>
                        {error && <Alert sx={{ marginTop: "30px" }} severity="error">Email atau password salah!</Alert>}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel onClick={() => handleRemember(!remember)} control={<Checkbox checked={remember} />} label="Ingat saya" />
                            <p><StyledLink to="/lupa-password" >Lupa password?</StyledLink></p>
                        </div>
                        <div>
                            <PrimaryButton onClick={_onSubmit} loading={loadingButton1} width='100%'>Masuk</PrimaryButton>
                            <Divider sx={{ marginY: "10px" }}>Atau</Divider>
                            <SecondaryButton onClick={onDemoLogin} loading={loadingButton2} width='100%'>Masuk dengan akun demo</SecondaryButton>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p >Belum punya akun? &nbsp;</p>
                            <p><StyledLink to="/register" >Daftar</StyledLink></p>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
}

export default Login;