import React from 'react';
import { Timezone } from '../../../components/basics/timezone';

export class Tz extends React.Component {
    render() {
        const {
            input: { name, onChange, value, ...restInput },
            meta,
            ...rest
        } = this.props;

        return (
            <Timezone
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
    }
}
