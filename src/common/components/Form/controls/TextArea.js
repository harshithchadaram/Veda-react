import React from 'react'
import { TextField } from '@material-ui/core';

export default function TextArea(props) {

    const { name, label, value, error = null, onChange } = props;
    return (
        <TextField
            className='d-flex'
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            rows={4}
            multiline
            {...(error && { error: true, helperText: error })}
        />
    )
}
