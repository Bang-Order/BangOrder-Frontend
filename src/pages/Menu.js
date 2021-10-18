import React from "react";
import Sidebar from '../components/sidebar/Sidebar';
import { styled } from "@mui/system";
import ListMenu from "../components/listmenu/ListMenu";

const Content = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  marginLeft: 280,
  marginRight: 20,
  marginTop: 90,
  padding: 25,
  paddingBottom: 20,
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
  },
}));

const Root = styled('div')(() => ({
  backgroundColor: '#f1f1f1',
  height: '100vh',
}))

const Menu = () => {
  return (
    <Root>
      <Sidebar index="4" name="Menu Restoran"/>
      <Content>        
        <ListMenu />
      </Content>
    </Root >
  )
}

export default Menu;