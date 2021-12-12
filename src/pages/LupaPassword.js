import * as React from 'react';
import { Box, Paper, Button, InputBase, FormControl, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import PrimaryButton from '../components/button/PrimaryButton';
import { useHistory } from 'react-router';
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
    width: '40%',
    height: 'auto',
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '50%',
    margin: 'auto',
  }

})

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'flex',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 12px',
  },
}));

const LupaPassword = () => {
  const classes = useStyle();
  const history = useHistory();

  const handleContinueButton = () => {
      history.push("/lupa-pass-Verif");
  }

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
            Reset Kata Sandi
          </h2>
          <FormControl 
            style={{ marginTop: '30px'}} 
            fullWidth
            variant="standard"
          >
              <BootstrapInput
                 placeholder="Email"
                 id="bootstrap-input"
                 name="email"
                 />
          </FormControl>
          <PrimaryButton style={{ width: '70%', fontSize: '16px', marginTop: 20 }} onClick={handleContinueButton}>Berikutnya</PrimaryButton>
        </Paper>
      </div>
    </div >
  )
}

export default LupaPassword; 

