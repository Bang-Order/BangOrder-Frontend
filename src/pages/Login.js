import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import { 
    Button, 
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
import { login } from "../utils/Auth";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';


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

const BootstrapButton = styled(Button)({
    backgroundColor: "#FFC300",
    borderRadius: 7,
    border: 0,
    width: '100%',
    marginTop: 50,
    marginBottom: 40,
    fontSize: '18px',
    textTransform: "unset",
    fontWeight: "bolder",
    color: "#000",
})

const Login2 = () => {
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEmailNull, setIsEmailNull] = React.useState(false);
    const [isPasswordNull, setIsPasswordNull] = React.useState(false);
    const history = useHistory();
    const classes = useStyle();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const _onSubmit = () => {
        axios.post('http://localhost:8000/api/auth/login',{
            email: email,
            password: password
        }).then((res)=>{
            login(res.data.data);
            history.push("/order-list");
        })
        setError(false);
        if (email === "") {
            setIsEmailNull(true);
        }
        if (password === "") {
            setIsPasswordNull(true);
        }
        // if (email === "sakura@gmail.com" && password === "sakura" ) {
        //     login({ email: email });
        //     history.push("/order-list");
        // } else {
        //     if (isEmailNull && isPasswordNull){
        //         setError(true);
        //     }
        // }
    }

    return (
        <div className={classes.root}>
            <Container fixed >
                <img className={classes.image} src="/logo-horizontal.png" alt="" />
                <h5>Contactless Food Ordering with QR Code</h5>
                {error && <Alert severity="error">Email atau password salah!</Alert>}
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
                <div style={{ display: 'flex' }}>
                    <FormControlLabel control={<Checkbox />} label="Ingat Saya" />
                </div>
                <div>
                    <BootstrapButton onClick={_onSubmit}>Masuk</BootstrapButton>
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