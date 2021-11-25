import React from 'react';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import PrimaryButton from '../components/button/PrimaryButton';
import { Button, FormControl, InputBase, InputLabel, ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { withStyles } from '@mui/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';


const useStyles = makeStyles(() => ({
  header: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'left'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    marginLeft: 80,
    marginRight: 25,
    marginBottom: 50,
    paddingTop: 20,
  },
  item: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 25,
    marginBottom: 50,
    alignItems: 'center'
  },
  label: {
    backgroundColor: '#ffc300',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    margin: 30,
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    borderRadius: 5,
    textAlign: 'left'
  },
  image: {
    width: '50%',
    height: 'auto',
    marginTop: 5,
    marginBottom: 20,
  },
  left: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: "space-between",
    marginLeft: 50
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  }
}))

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
    width: '500px',
    padding: '10px 12px',
  },
}));

const Input = styled('input')({
  display: 'none',
});

const Form = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

  return (
    <div>
      <header className={classes.header}>
        <h2>Data Profil</h2>
        <Divider style={{ marginTop: 10 }} />
      </header>
      <div>
        <h3 className={classes.label}>Data Restoran</h3>
        <div className={classes.content}>
          <div className={classes.left}>
            <div>
              <img className={classes.image} src="./logo512.png" alt="" variant="outlined" />
              <label htmlFor="contained-button-file">
                <Input />
                <ListItem>
                  <PrimaryButton width="100%" component="span">
                    Upload
                  </PrimaryButton>
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Gunakan foto berekstensi jpg/png dengan rasio 1:1 (MAX 1 MB)">
                      <ListItemIcon>
                        <Button>
                          <InfoOutlinedIcon onClick={handleTooltipOpen} />
                        </Button>
                      </ListItemIcon>
                    </Tooltip>
                  </ClickAwayListener>
                </ListItem>
              </label>
            </div>
          </div>
          <div className={classes.right}>
            <div>
              <FormControl variant="standard" font-size="24px">
                <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                  Nama Restoran
                </InputLabel>
                <BootstrapInput
                  placeholder="Nama Restoran" />
              </FormControl>
            </div>
            <div className={classes.right}>
              <FormControl variant="standard" style={{ marginTop: 40 }}>
                <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                  Alamat Lengkap
                </InputLabel>
                <BootstrapInput
                  placeholder="Alamat"
                  multiline
                  minRows={3}
                  style={{ width: '400px' }}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className={classes.label}>Data Pemilik</h3>
        <div className={classes.item}>
          <div className={classes.item}>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                Nama Pemilik
              </InputLabel>
              <BootstrapInput
                placeholder="Nama Pemilik" />
            </FormControl>
          </div>
          <div className={classes.item}>
            <FormControl variant="standard" >
              <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: "24px" }}>
                Nomor Telepon
              </InputLabel>
              <BootstrapInput
                placeholder="085xxxxxxxxx" />
            </FormControl>
          </div>
        </div>
      </div>
      <div style={{ float: 'right', marginRight: '10%', marginBottom: 30 }}>
        <PrimaryButton >Selesai</PrimaryButton>
      </div>
    </div>
  )

}

export default Form;