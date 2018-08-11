import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// For a Formik checkbox, the boolean value is in the field.value.
export default ({ field, label, ...props }) => (
    <FormControlLabel
        control={
            <Checkbox
                {...props}
                name={field.name}
                checked={!!field.value}
                onChange={field.onChange}
                color="primary"
            />
        }
        label={label}
    />
);
