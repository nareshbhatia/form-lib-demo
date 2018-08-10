import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({ field, form: { touched, errors }, ...props }) => (
    <TextField
        {...props}
        name={field.name}
        value={field.value}
        helperText={
            touched[field.name] && errors[field.name]
                ? errors[field.name]
                : undefined
        }
        error={touched[field.name] && errors[field.name]}
        onChange={field.onChange}
        margin="normal"
    />
);
