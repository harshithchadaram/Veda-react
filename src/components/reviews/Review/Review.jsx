import { Card, CardContent, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';

import React from 'react';
export default function Review(props) {
    return (
        <Card style={{ height: 100 }}>
            <CardContent>
                <div className='d-flex justify-content-between align-items-center'>
                    <Typography className='bhooky-bold item-title'>
                        {props.reviewInfo.userName}
                    </Typography>
                    <Typography variant="subtitle1" className='bhooky-medium d-flex align-items-center'>
                        <GradeIcon style={{ fontSize: 15, margin: 3 }} />
                        {props.reviewInfo.rating}
                    </Typography>
                </div>
                <Typography className='bhooky-medium item-title' variant='body2' color='textSecondary'>
                    {props.reviewInfo.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
