import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2
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

                    const bookTitle = bookStore.editedBook
                        ? bookStore.editedBook.title
                        : {};

                    return <div className={classes.root}>{bookTitle}</div>;
                }
            }
        )
    )
);
