import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
}) => (
    <TextField
        {...rest}
        name={name}
        helperText={meta.touched ? meta.error : undefined}
        error={meta.touched && meta.error}
        inputProps={restInput}
        onChange={onChange}
        value={value}
        margin="normal"
    />
);
