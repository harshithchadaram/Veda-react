import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, Checkbox, ListItemText } from '@material-ui/core';

export default function MultiSelect(props) {

    const { name, label, value = [], error = null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                multiple={true}
                label={label}
                name={name}
                value={value}
                renderValue={(selected) => selected.join(', ')}
                onChange={onChange}>
                {
                    options.map(
                        item => (
                            <MenuItem key={item} value={item}>
                                <Checkbox checked={value.indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
