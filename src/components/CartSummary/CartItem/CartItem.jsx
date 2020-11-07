import React from 'react';
import './CartItem.scss';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import AddorRemoveButtons from '../../../common/components/AddorRemoveButtons/AddorRemoveButtons';
const useStyles = makeStyles((theme) => ({
    item: {
        width: 'auto'
    },
    itemName: {
        minWidth: '40%'
    }
}));
export default function CartItem(props) {
    const classes = useStyles();
    const item = props.item;

    return (
        <React.Fragment>
            <Card className='my-3 item-card'>
                <CardContent className={`${classes.item} d-flex justify-content-between align-items-center py-2`}>
                    <Typography variant="body2" className={`${classes.itemName} item-name`}>
                        {item.productName}
                    </Typography>
                    <AddorRemoveButtons cartCount={item.quantity} handleCart={props.handleCart} />
                    <Typography variant="body2" className='item-price text-right bhooky-semibold'>
                        {item.productPrice}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

