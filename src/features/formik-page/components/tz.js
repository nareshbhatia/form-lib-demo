import React from 'react';
import { Timezone } from '../../../components/basics/timezone';

export class Tz extends React.Component {
    render() {
        const { field, form: { touched, errors }, ...props } = this.props;

        return (
            <Timezone
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
    }
}
