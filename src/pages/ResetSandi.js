import * as React from 'react';
import { 
    Box, 
    Paper, 
    Button, 
    InputBase, 
    FormControl, 
    InputLabel, 
    OutlinedInput, 
    InputAdornment, 
    IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import { useHistory } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PrimaryButton from '../components/button/PrimaryButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const useStyle = makeStyles({
  logo: {
    width: '15%',
    height: 'auto',
    padding: 20,
    display: 'flex',
  },
  box: {
    boxShadow: 3,
    // width: '70%',
    // alignContent: 'center'
  },
  image: {
    width: '20%',
    height: 'auto',
    marginTop: '20',
  },
  paperStyle: {
    padding: 30,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const ResetSandi= () => {
  const classes = useStyle();
  const history = useHistory();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordNull, setIsPasswordNull] = React.useState(false);

  const handleContinueButton = () => {
    history.push("/reset-sandi-berhasil");
}

const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
};

  return (
    <div>
      <header>
        <img src="/logo-horizontal.png" alt="" className={classes.logo} />
      </header>
      <div>
        <Paper elevation={10} className={classes.paperStyle}>
          <h2>
            <Button style={{ float: 'left' }} >
              <ArrowBackIosIcon />
            </Button>
            Atur Kata Sandi
          </h2>
          <p>Buat kata sandi baru untuk <b>ai*****@gmail.com</b></p>
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
          <PrimaryButton style={{ width: '70%', fontSize: '16px', marginTop: 20 }} onClick={handleContinueButton} >Oke</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default ResetSandi; 
