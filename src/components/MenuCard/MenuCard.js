import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea } from '@mui/material';

const MenuCard = (param) => {
    const menu = param.menu;

    return (
        <Card sx={{ width: '90%', marginTop: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    src={menu.image}
                    alt={menu.name}
                />
                <CardContent>
                    <h3>
                        {menu.name}
                    </h3>
                    <Typography variant="body2" color="text.secondary">
                        Rp {(menu.price).toLocaleString(['id'])}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MenuCard;