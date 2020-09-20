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
    const { name, price, variantsV2 } = props.itemInfo
    const [itemCount, setItemCount] = React.useState(0);
    return (
        <Card className={`restaurant-card ${classes.root}`}>
            <CardMedia
                component="img"
                alt={name}
                height="140"
                image="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/rkwpgkihezjivnneepes"
                title={name}
            />
            <CardContent>
                <Typography className='bhooky-medium item-title' onClick={() => props.handleTitleClick(itemCount)}>
                    {name}
                </Typography>
            </CardContent>

            <CardActions className='justify-content-between pl-3 mt-auto'>
                <Typography variant="body2" component="p" className='item-price bhooky-regular'>
                    {variantsV2?.pricing_models[0].price ? variantsV2?.pricing_models[0].price / 100 : price / 100}
                </Typography>
                <AddorRemoveButtons size='extraSmall' handleCount={(count) => setItemCount(count)} />
            </CardActions>
        </Card>
    );
}