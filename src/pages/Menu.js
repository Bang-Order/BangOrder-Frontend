import React from "react";
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import ListMenu from "../components/listmenu/ListMenu";

const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    paddingBottom: 20,
    textAlign: "left",
  },
}));

const Frame = styled('div')(() => ({
  backgroundColor: '#ffffff',
  marginLeft: 350,
  marginRight: 20,
  marginTop: 60,
  borderRadius: 7,
  padding: 0,
  width: '100%-350',
}))

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  height: '100vh',
}))

const Menu = () => {
  const classes = useStyles();

  return (
    <Root>
      <div>
        <Sidebar />
        <Topbar />
        <div>
          <Frame>
            <div className={classes.content}>
              <ListMenu />
            </div>
          </Frame>
        </div>
      </div>
    </Root >
  )
}

export default Menu;