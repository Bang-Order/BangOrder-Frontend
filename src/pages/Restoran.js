import Sidebar from "../components/sidebar/Sidebar";
import { styled } from '@mui/material/styles';

const Restoran = () => {

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
        minHeight: '100vh',
        paddingBottom: 20
      }))

    return (
        <Root>
            <Sidebar index="0" name="Restoran"/>
            <Content>
                
            </Content>
        </Root>
    );
}

export default Restoran;