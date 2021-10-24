
import Skeleton from '@mui/material/Skeleton';

const MenuCardLoading = () => {
    return ( 
        // <Skeleton
        //       animation="wave"
        //       height={10}
        //       width="80%"
        //       style={{ marginBottom: 6 }}
        //     />

            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
     );
}

export default MenuCardLoading;