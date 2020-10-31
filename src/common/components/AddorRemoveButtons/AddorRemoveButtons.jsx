import React, { useState } from 'react';
import ResizeableIconButton from '../ResizeableIconButton/ResizeableIconButton';
import AddCircleIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/Remove';
import { Typography, Button } from '@material-ui/core';
import './AddorRemoveButtons.scss';
export default function AddorRemoveButtons(props) {
    let [count, setCount] = useState(props.count);
    const incBtn = () => {
        let currCount = count;
        setCount(currCount + 1);
        props.handleCount(currCount);
    }
    const decBtn = () => {
        let currCount = count;
        setCount(currCount - 1);
        props.handleCount(currCount);
    }

    return (
        <div>
            {count !== 0 ?
                <div className='d-flex add-or-remove'>

                    <ResizeableIconButton disableRipple={true} disableFocusRipple={true} onClick={event => { props.handleCart(); setCount(count => count - 1); }} size='small' className='remove'>
                        <RemoveCircleIcon />
                    </ResizeableIconButton>
                    <Typography display='block' variant="subtitle2" component='span' className='align-self-center px-2 item-count bhooky-bold'>
                        {count}
                    </Typography>
                    <ResizeableIconButton disableRipple={true} disableFocusRipple={true} onClick={event => { props.handleCart(); setCount(count => count + 1); }} size='small' className='add'>
                        <AddCircleIcon />
                    </ResizeableIconButton>

                </div>
                : <Button variant='outlined' color='default' onClick={event => { props.handleCart(); setCount(1); }}>Add</Button>}
        </div>
    );
}