import React from 'react';
import './RestaurantItemCard.scss';
import { makeStyles, Card, CardActionArea, CardMedia, CardHeader, Avatar, CardActions, CardContent, Typography } from '@material-ui/core';
import AddorRemoveButtons from '../AddorRemoveButtons/AddorRemoveButtons';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 200,
        minHeight: 150
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '90%'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 150,
        minHeight: 150,
        maxHeight: 150
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    ratingIcon: {
        fontSize: 15
    },
    cardRatingAttr: {
        background: 'yellowgreen',
        color: 'white',
        padding: 3
    },
    cardTimingAttr: {
        color: '#000000c9'
    }
}));
export default function RestaurantItemCard(props) {
    const classes = useStyles();
    const { name, price, image } = props.itemInfo
    const [itemCount, setItemCount] = React.useState(0);
    return (
        <Card className={`restaurant-card ${classes.root}`}>
            <CardMedia
                component="img"
                alt={name}
                height="140"
                image={image.length > 0 ? image[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9wAAiM4eBLesNjgpOTn-_27WXIb6kEevJQ&usqp=CAU"}
                title={name}
            />
            <CardContent>
                <Typography className='bhooky-medium item-title' onClick={() => props.handleTitleClick(itemCount)} style={{ textTransform: 'capitalize' }}>
                    {name}
                </Typography>
            </CardContent>

            <CardActions className='justify-content-between pl-3 mt-auto'>
                <Typography variant="body2" component="p" className='item-price bhooky-regular'>
                    {price}
                </Typography>
                <AddorRemoveButtons size='extraSmall' handleCount={(count) => setItemCount(count)} />
            </CardActions>
        </Card>
    );
}