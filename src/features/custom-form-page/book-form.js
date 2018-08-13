import React from 'react';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import { Field } from './components/field';
import { FormWrapper } from './components/form-wrapper';
import { TextInput } from './components/text-input';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2
    },
    buttonBar: {
        marginTop: theme.spacing.unit * 3
    },
    selectStyle: {
        minWidth: 120,
        marginRight: theme.spacing.unit * 2
    },
    copies: {
        width: 100
    },
    eventExists: {
        marginTop: theme.spacing.unit * 4
    },
    eventStartTime: {
        display: 'none'
    },
    textInput: {
        marginRight: theme.spacing.unit * 2
    }
});

const decorate = withStyles(styles);

export const BookForm = inject('rootStore')(
    decorate(
        observer(
            class extends React.Component {
                render() {
                    const {
                        classes,
                        rootStore: { bookStore }
                    } = this.props;

                    return (
                        <FormWrapper
                            entity={bookStore.editedBook}
                            render={({ entity }) => (
                                <form>
                                    <Field
                                        entity={entity}
                                        attr="title"
                                        component={TextInput}
                                        label="Title"
                                        fullWidth
                                    />

                                    <div className={classes.buttonBar}>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                    );
                }
            }
        )
    )
);
