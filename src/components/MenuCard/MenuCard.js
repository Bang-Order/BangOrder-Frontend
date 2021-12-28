import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    imgContainer: {
        paddingBottom: '100%',
        height: 0,
        position: 'relative',
    },
    img: {
        width: "100%",
        display: "block",
        position: "absolute"
    }
}));

const MenuCard = (param) => {
    const menu = param.menu;
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea>
                <div className={classes.imgContainer}>
                    <img
                        className={classes.img}
                        src={menu.image}
                        alt={menu.name}
                    />
                </div>
                <CardContent>
                    <h3>
                        {menu.name}
                    </h3>
                    <Typography variant="body2" color="text.secondary">
                        {(menu.price).toLocaleString(['id'])}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MenuCard;