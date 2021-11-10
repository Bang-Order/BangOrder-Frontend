import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Menu, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import '../ordercard/cardlist.css';
// import axios from 'axios';
import PrimaryButton from '../button/PrimaryButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: 20,
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '10%',
    minWidth: 160,
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    minWidth: 370,
    maxWidth: 390,
    marginRight: 20,
  },
  content: {
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  meja: {
    margin: 0,
    width: 40,
  },
  id: {
    margin: 0,
    width: 90,
  },
  done: {
    width: 146,
    backgroundColor: '#FFC300',
    position: 'absolute',
    bottom: 21,
    right: 15,
    zIndex: 2,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  total: {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 40,
    marginBottom: 20,
    marginTop: 20,
    width: 170,
  }
}));

const HistoryCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.header}>
          <div className={classes.left}>
            <h4 className={classes.meja}>
              Meja
            </h4>
            <h4 className={classes.id}>
              Id Pesanan
            </h4>
          </div>
          <div className={classes.right}>
            <h4>
              20/06/2021
            </h4>
            <h4>
              12:20:19
            </h4>
          </div>
        </CardContent>
        <div className={classes.content}>
          <div className={classes.item}>
            <h4>2x Jus tomat</h4>
            <h4>20000</h4>
          </div>
          <h5 sx={{ fontWeight: 'reguler' }}>Catatan :</h5>
          <Divider />
        </div>
        <div className={classes.total}>
          <h4>Total harga : </h4>
          <h4>20000</h4>
        </div>
      </div>
    </Card>
  );
}

export default HistoryCard;