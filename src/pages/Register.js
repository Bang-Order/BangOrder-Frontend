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
    FormControl
} from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import PrimaryButton from '../components/button/PrimaryButton';
import axios from 'axios';
require('dotenv').config();

const useStyle = makeStyles({
    root: {
        position: 'absolute',
        // backgroundColor: 'black',
        top: 50,
        left: '50%',
        width: '80%',
        minWidth: 300,
        maxWidth: 500,
        display: 'flex',
        alignContent: 'center',
        transform: 'translate(-50%)'
    },
    image: {
        width: '70%',
        height: 'auto',
    }
})
const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#989999',
    fontWeight: 'bold',
})

const Register2 = () => {
    const [data, setData] = React.useState("");
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
        } else if (password === "") {
            setIsPasswordNull(true);
        } else if (confirmPassword === "") {
            setIsConfirmPasswordNull(true);
        } else {
            axios.post(process.env.REACT_APP_API_URL+'auth/register/account', {
                email: email,
                password: password,
                confirm_password: confirmPassword
            })
            .then((res) => {
                setData(res.data.data)
                history.push({
                    pathname: "/form",
                    state: res.data.data
                });
            })
            .catch((err) => {
                setError(err.response.message);
              })
        }

    }

    return (
        <div className={classes.root}>
            <Container>
                <img className={classes.image} src="/logo-horizontal.png" alt="" />
                <h5>Contactless Food Ordering with QR Code</h5>
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
                        label="Password"
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
                    <PrimaryButton onClick={_onSubmit} width="100%">Daftar</PrimaryButton>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p >Sudah punya akun?</p>
                    <p><StyledLink to="/login" >Masuk</StyledLink></p>
                </div>
            </Container>
        </div>
    );
}

export default Register2;