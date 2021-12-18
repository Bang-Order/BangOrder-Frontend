import * as React from 'react';
import { Box, Paper, Button, InputBase, FormControl, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
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
  },
  image: {
    width: '20%',
    height: 'auto',
    marginTop: '20',
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
    width: '380px'
  },
}));


const LupaPassword = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [email, setEmail] = React.useState(props.location.state.email);

  const censorEmail = (email) => {
    var parts = email.split("@");
    var name = parts[0];
    var result = name.charAt(0);
    for (var i = 1; i < name.length; i++) {
      result += "*";
    }
    result += name.charAt(name.length - 1);
    result += "@";
    var domain = parts[1];
    result += domain.charAt(0);
    var dot = domain.indexOf(".");
    for (var i = 1; i < dot; i++) {
      result += "*";
    }
    result += domain.substring(dot);
    return result;
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
          <img className={classes.image} src="/Email1.png" alt="" />
          <p>{'Email verifikasi telah dikirimkan ke ' + censorEmail(email)}</p>
        </Paper>
      </div>
    </div >
  )
}

export default LupaPassword; 
