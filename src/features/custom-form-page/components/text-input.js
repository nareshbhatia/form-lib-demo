import React from 'react';
import TextField from '@material-ui/core/TextField';

export const TextInput = ({ value, onChange, ...props }) => (
    <TextField value={value} onChange={onChange} margin="normal" {...props} />
);
