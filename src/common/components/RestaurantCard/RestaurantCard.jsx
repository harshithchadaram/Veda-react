import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import GradeIcon from '@material-ui/icons/Grade';
import { CardActionArea } from '@material-ui/core';
import './RestaurantCard.scss'
import { useHistory } from 'react-router-dom';
import * as _ from 'lodash';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minWidth: 350
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '90%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
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
export default function RestaurantCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    return (
        <Card className={`restaurant-card flex-row ${classes.root}`} onClick={() => { props.showItemDialog(); }}>
            <CardMedia
                className={classes.cover}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9wAAiM4eBLesNjgpOTn-_27WXIb6kEevJQ&usqp=CAU"
                title="Live from space album cover"
            />

            <CardContent className={classes.content}>
                <div className='d-flex'>
                    <div className='d-flex flex-column px-3 py-2'>
                        <Typography component="h4" variant="h5">
                            {props.rName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Fast food, Pizzas
                    </Typography>
                    </div>
                    <Typography variant="body2" component="p" className='item-price bhooky-regular pt-3 mx-2 text-right'>
                        20
                    </Typography>
                </div>
                <div className={`${classes.controls} px-3 py-2`}>
                    <Typography variant="caption" className={classes.cardRatingAttr}>
                        <GradeIcon className={`${classes.ratingIcon} mr-1`} />
                        4.1
                    </Typography>
                    <Typography variant="caption" className={classes.cardTimingAttr}>
                        20 mins
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
