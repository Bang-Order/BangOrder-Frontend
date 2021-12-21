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
    Container,
} from '@mui/material';
import { isLogin, login } from "../utils/Auth";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import PrimaryButton from '../components/button/PrimaryButton';

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
        padding: "2em"
    }
})

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#989999',
    fontWeight: 'bold',
})

const Login2 = () => {
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState();
    const [email, setEmail] = React.useState("");
    const [remember, setRemember] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEmailNull, setIsEmailNull] = React.useState(false);
    const [isPasswordNull, setIsPasswordNull] = React.useState(false);
    const history = useHistory();
    const classes = useStyle();
    const [Loading, setLoading] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const _onSubmit = () => {
        if (email === "") {
            setIsEmailNull(true);
        } else if (password === "") {
            setIsPasswordNull(true);
        } else {
            setLoading(true);
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
                setLoading(false);
            })
        }
    }
    const handleRemember = (value) => {
        setRemember(value);
    }
    
    return (
        <div className={classes.root}>
            <Container fixed >
                <img className={classes.image} src="/logo-horizontal.png" alt="" />
                <h4>Contactless Food Ordering with QR Code</h4>
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
                    <FormControlLabel onClick={() => handleRemember(!remember)} control={<Checkbox checked={remember}/>} label="Ingat Saya" />
                    <p><StyledLink to="/lupa-password" >Lupa password?</StyledLink></p>
                </div>
                <div>
                    <PrimaryButton onClick={_onSubmit} loading={Loading} width='100%'>Masuk</PrimaryButton>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p >Belum punya akun?</p>
                    <p><StyledLink to="/register" >Daftar</StyledLink></p>
                </div>
            </Container>
        </div>
    );
}

export default Login2;