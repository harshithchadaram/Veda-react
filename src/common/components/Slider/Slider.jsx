import React, { Component } from "react";
import Slider from "react-slick";
import './Slider.scss';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CardActionArea } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: 'black'
    },

    cover: {

        height: 200
    },

}));
export default function CenterSlider() {
    const state = {
        slides: ['Burgers', 'Sandwiches', 'Fast Food', 'Chicken', 'Breakfast', 'Soft drinks']
    };
    const selectCategory = (event) => {
        console.log(event.currentTarget.innerText);
    }
    const classes = useStyles();
    const settings = {

        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1800,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='center-slider px-5'>
            <Slider {...settings}>
                {state.slides.map(function (slide) {
                    return (
                        <Card className={classes.root} raised={true} zDepth={1}>
                            <CardActionArea onClick={selectCategory}>
                                <CardMedia
                                    className={classes.cover}
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9wAAiM4eBLesNjgpOTn-_27WXIb6kEevJQ&usqp=CAU"
                                    title="Live from space album cover"
                                >
                                    <div className='card-media-overlay'>
                                        <Typography variant="h3" className='card-category-text' gutterBottom>
                                            {slide}
                                        </Typography>
                                    </div>
                                </CardMedia>

                            </CardActionArea>
                        </Card>
                    );
                })}
            </Slider>
        </div >
    );

}