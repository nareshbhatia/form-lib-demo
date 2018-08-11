import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class TransformInput extends React.Component {
    render() {
        const {
            field,
            form: { touched, errors },
            parse,
            format,
            ...props
        } = this.props;
        return (
            <TextField
                {...props}
                name={field.name}
                value={format(field.value)}
                helperText={
                    touched[field.name] && errors[field.name]
                        ? errors[field.name]
                        : undefined
                }
                error={touched[field.name] && errors[field.name]}
                onChange={this.handleChange}
                margin="normal"
            />
        );
    }

    handleChange = event => {
        const {
            field,
            form: { setFieldValue },
            parse
        } = this.props;
        setFieldValue(field.name, parse(event.target.value));
    };
}
