import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const ResizableIconButton = ({ classes, size, ...props }) =>
    <IconButton className={classes[size]}
        {...props} />;

const styles = {
    small: {
        '& svg': {
            fontSize: 20
        }
    },
    medium: {
        '& svg': {
            fontSize: 24
        }
    },
    large: {
        '& svg': {
            fontSize: 32
        }
    }
};

export default withStyles(styles)(ResizableIconButton);