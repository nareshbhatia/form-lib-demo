import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default ({
    input: { checked, name, onChange, ...restInput },
    meta,
    label,
    ...rest
}) => (
    <FormControlLabel
        control={
            <Checkbox
                {...rest}
                name={name}
                onChange={onChange}
                checked={!!checked}
                color="primary"
            />
        }
        label={label}
    />
);
