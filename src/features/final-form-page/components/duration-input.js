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
        const { input } = this.props;
        this.setState({
            durationStr: this.computeDurationStr(input.value)
        });
    }

    /**
     * Update local state when props change
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const { input } = this.props;
        const { input: nextInput } = nextProps;

        if (input.value !== nextInput.value) {
            this.setState({
                durationStr: this.computeDurationStr(nextInput.value)
            });
        }
    }

    render() {
        const {
            input: { name, onChange, value, ...restInput },
            meta,
            ...props
        } = this.props;
        const { durationStr } = this.state;

        return (
            <TextField
                {...props}
                name={name}
                value={durationStr}
                helperText={meta.touched ? meta.error : undefined}
                error={meta.touched && meta.error}
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
        const { input } = this.props;
        const { durationStr } = this.state;
        input.onChange(this.computeMillis(durationStr));
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
