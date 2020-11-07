import React, { useState } from 'react';
import ResizeableIconButton from '../ResizeableIconButton/ResizeableIconButton';
import AddCircleIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/Remove';
import { Typography, Button } from '@material-ui/core';
import './AddorRemoveButtons.scss';
export default function AddorRemoveButtons(props) {
    let [count, setCount] = useState(props.cartCount);

    return (
        <div>
            {count !== 0 ?
                <div className='d-flex add-or-remove'>

                    <ResizeableIconButton disableRipple={true} disableFocusRipple={true} onClick={event => { setCount(count => count - 1); props.handleCart(count - 1); }} size='small' className='remove'>
                        <RemoveCircleIcon />
                    </ResizeableIconButton>
                    <Typography display='block' variant="subtitle2" component='span' className='align-self-center px-2 item-count bhooky-bold'>
                        {count}
                    </Typography>
                    <ResizeableIconButton disableRipple={true} disableFocusRipple={true} onClick={event => { setCount(count => count + 1); props.handleCart(count + 1); }} size='small' className='add'>
                        <AddCircleIcon />
                    </ResizeableIconButton>

                </div>
                : <Button variant='outlined' color='default' onClick={event => { setCount(1); props.handleCart(count + 1); }}>Add</Button>}
        </div>
    );
}