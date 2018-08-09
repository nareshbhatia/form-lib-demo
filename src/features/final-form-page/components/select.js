import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default ({
    classes,
    input: { name, onChange, value, ...restInput },
    meta,
    label,
    options,
    className,
    ...rest
}) => (
    <FormControl
        error={meta.touched && meta.error}
        margin="normal"
        className={className}
    >
        <InputLabel error={meta.touched && meta.error}>{label}</InputLabel>
        <Select
            {...rest}
            value={value}
            inputProps={restInput}
            onChange={onChange}
            input={<Input />}
        >
            <MenuItem value="">&nbsp;</MenuItem>
            {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
        {meta.touched && meta.error ? (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
        ) : null}
    </FormControl>
);
