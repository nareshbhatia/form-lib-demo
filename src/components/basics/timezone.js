/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[value|onChange]" }]*/

import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import { MuiAutosuggest } from './mui-autosuggest';

const tzNames = moment.tz.names();

export class Timezone extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            timezoneStr: props.value,
            suggestions: []
        };
    }

    /**
     * Update local state when props change
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        const { value: nextValue } = nextProps;

        if (value !== nextValue) {
            this.setState({
                timezoneStr: nextValue
            });
        }
    }

    render() {
        const { value, onChange, ...rest } = this.props;
        const { timezoneStr, suggestions } = this.state;

        // Propagate onBlur as onChange
        return (
            <MuiAutosuggest
                value={timezoneStr}
                suggestions={suggestions}
                getSuggestionValue={this.getSuggestionValue}
                onChange={this.handleChange}
                onBlur={onChange}
                onSuggestionsFetchRequested={
                    this.handleSuggestionsFetchRequested
                }
                onSuggestionsClearRequested={
                    this.handleSuggestionsClearRequested
                }
                {...rest}
            />
        );
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : tzNames.filter(tzName => {
                  const keep =
                      count < 5 &&
                      tzName.toLowerCase().indexOf(inputValue) !== -1;

                  if (keep) {
                      count += 1;
                  }

                  return keep;
              });
    };

    getSuggestionValue = suggestion => suggestion;

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    // Don't propagate onChange. Just update local state
    handleChange = (event, { newValue }) => {
        this.setState({
            timezoneStr: newValue
        });
    };
}
