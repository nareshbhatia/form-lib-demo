/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[millis|onChange]" }]*/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTimeUtils } from '../../../utils/datetime-utils';

export default class DurationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            durationStr: ''
        };
    }

    componentDidMount() {
        const { field } = this.props;
        this.setState({
            durationStr: this.computeDurationStr(field.value)
        });
    }

    /**
     * Update local state when props change
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const { field } = this.props;
        const { field: nextField } = nextProps;

        if (field.value !== nextField.value) {
            this.setState({
                durationStr: this.computeDurationStr(nextField.value)
            });
        }
    }

    render() {
        const {
            field,
            form: { touched, errors },
            ...props
        } = this.props;
        const { durationStr } = this.state;

        return (
            <TextField
                {...props}
                name={field.name}
                value={durationStr}
                helperText={
                    touched[field.name] && errors[field.name]
                        ? errors[field.name]
                        : undefined
                }
                error={touched[field.name] && errors[field.name]}
                placeholder="HH:MM"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onBlur={this.handleDurationChanged}
                margin="normal"
            />
        );
    }

    handleChange = event => {
        this.setState({ durationStr: event.target.value });
    };

    handleKeyPress = event => {
        // Register duration change when Enter key is pressed
        if (event.charCode === 13) {
            this.handleDurationChanged();
        }
    };

    handleDurationChanged = () => {
        const {
            field,
            form: { setFieldValue }
        } = this.props;
        const { durationStr } = this.state;
        setFieldValue(field.name, this.computeMillis(durationStr));
    };

    computeDurationStr(millis) {
        return millis ? DateTimeUtils.millisToDurationStr(millis) : '';
    }

    computeMillis(durationStr) {
        return durationStr.length > 0
            ? DateTimeUtils.durationStrToMillis(durationStr)
            : null;
    }
}
