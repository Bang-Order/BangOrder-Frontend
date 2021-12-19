import * as React from 'react';
import { Paper, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const LupaPassword = (props) => {
  const classes = useStyle();
  const [email] = React.useState(props.location.state.email);

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
    for (i = 1; i < dot; i++) {
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
