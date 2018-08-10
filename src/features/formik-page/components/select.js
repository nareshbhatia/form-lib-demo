import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default ({
    field,
    form: { touched, errors },
    label,
    options,
    className,
    ...props
}) => (
    <FormControl
        error={touched[field.name] && errors[field.name]}
        margin="normal"
        className={className}
    >
        <InputLabel error={touched[field.name] && errors[field.name]}>
            {label}
        </InputLabel>
        <Select
            {...props}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            input={<Input />}
        >
            <MenuItem value="">&nbsp;</MenuItem>
            {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
        {touched[field.name] && errors[field.name] ? (
            <FormHelperText error={true}>{errors[field.name]}</FormHelperText>
        ) : null}
    </FormControl>
);
