import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default ({
    // For a Final Form checkbox, the boolean value is in the "checked" prop,
    // NOT in the value prop.
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
                checked={!!checked}
                InputProps={restInput}
                onChange={onChange}
                color="primary"
            />
        }
        label={label}
    />
);
