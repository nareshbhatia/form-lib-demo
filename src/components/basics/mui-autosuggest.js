import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input
                },
                ...other
            }}
        />
    );
}

// TODO: Write more generically without knowing the structure of suggestion
// See https://github.com/moroshko/react-autosuggest/issues/514
function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

const styles = theme => ({
    container: {
        position: 'relative',
        marginTop: theme.spacing.unit * 2,
        zIndex: 2
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0
    },
    suggestion: {
        display: 'block'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    }
});

class MuiAutosuggestBase extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
        error: PropTypes.bool,
        helperText: PropTypes.string,
        suggestions: PropTypes.array.isRequired,
        getSuggestionValue: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onSuggestionsFetchRequested: PropTypes.func.isRequired,
        onSuggestionsClearRequested: PropTypes.func.isRequired
    };

    render() {
        const {
            classes,
            className,
            label,
            error,
            helperText,
            suggestions,
            getSuggestionValue,
            onSuggestionsFetchRequested,
            onSuggestionsClearRequested,
            disabled,
            margin,
            ...rest
        } = this.props;

        return (
            <FormControl
                className={className}
                error={error}
                disabled={disabled}
                margin={margin}
            >
                {label ? (
                    <InputLabel shrink error={error} disabled={disabled}>
                        {label}
                    </InputLabel>
                ) : null}
                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen:
                            classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    suggestions={suggestions}
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    renderInputComponent={renderInput}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        classes,
                        onKeyPress: this.onKeyPress,
                        ...rest
                    }}
                />
                {helperText ? (
                    <FormHelperText error={error} disabled={disabled}>
                        {helperText}
                    </FormHelperText>
                ) : null}
            </FormControl>
        );
    }

    /**
     * Prevent form submission when Enter key is pressed.
     * If we don't do this, then the enclosing form will be submitted without
     * updating the value entered in Autosuggest.
     */
    onKeyPress = event => {
        if (event.charCode === 13) {
            event.preventDefault();
        }
    };
}

export const MuiAutosuggest = withStyles(styles)(MuiAutosuggestBase);
