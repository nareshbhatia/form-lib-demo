import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment-timezone';
import * as yup from 'yup';
import { Book, BookEvent } from '../../stores/book';
import Checkbox from './components/checkbox';
import Select from './components/select';
import TextInput from './components/text-input';

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

                    const jsBook = serialize(bookStore.editedBook);

                    const { publisherMap } = bookStore;

                    const validationSchema = yup.object().shape({
                        title: yup.string().required(),
                        copiesPublished: yup.number().integer().positive()
                    });

                    return (
                        <Formik
                            initialValues={jsBook}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const book = deserialize(values);
                                bookStore.setBook(book);
                                bookStore.selectBook(book);
                                setSubmitting(false);
                            }}
                            render={({ values, isSubmitting }) => (
                                <Form className={classes.root}>
                                    <Field
                                        name="title"
                                        component={TextInput}
                                        label="Title"
                                        fullWidth
                                    />
                                    <Field
                                        name="subtitle"
                                        component={TextInput}
                                        label="Subtitle"
                                        fullWidth
                                    />
                                    <div>
                                        <Field
                                            name="publisherId"
                                            component={Select}
                                            label="Publisher"
                                            options={Array.from(
                                                publisherMap.values()
                                            )}
                                            className={classes.selectStyle}
                                        />
                                        <Field
                                            name="isPublished"
                                            component={Checkbox}
                                            label="Published"
                                        />
                                        {
                                            // TODO: Think of a better way to edit numbers.
                                            // Here the generated value ends up being a string.
                                            values.isPublished &&
                                            <Field
                                                name="copiesPublished"
                                                component={TextInput}
                                                label="Copies"
                                                className={classes.copies}
                                            />
                                        }
                                    </div>

                                    <div className={classes.buttonBar}>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        />
                    );
                }
            }
        )
    )
);

function serialize(book) {
    const event = book.bookEvent;
    const eventExists = !!event;
    const jsEvent = eventExists
        ? {
              name: event.name || '',
              city: event.city || '',
              timezone: event.timezone || '',
              startTime: event.startTime,
              datePart: computeDatePart(event.startTime, event.timezone),
              timePart: computeTimePart(event.startTime, event.timezone),
              duration: event.duration || 0
          }
        : undefined;

    return {
        id: book.id || '',
        title: book.title || '',
        subtitle: book.subtitle || '',
        publisherId: book.publisherId || '',
        authorIds: book.authorIds ? book.authorIds.slice() : [],
        isPublished: book.isPublished || false,
        copiesPublished: book.copiesPublished || 0,
        eventExists: eventExists,
        event: jsEvent
    };
}

function deserialize(jsBook) {
    const bookEvent = jsBook.eventExists
        ? new BookEvent(
              jsBook.event.name,
              jsBook.event.city,
              jsBook.event.timezone,
              jsBook.event.startTime,
              jsBook.event.duration
          )
        : undefined;
    return new Book(
        jsBook.id,
        jsBook.title,
        jsBook.subtitle,
        jsBook.publisherId,
        jsBook.authorIds,
        jsBook.isPublished,
        jsBook.copiesPublished,
        bookEvent
    );
}

function computeDatePart(date, timezone) {
    if (!date) {
        return '';
    }

    return timezone
        ? moment(date)
              .tz(timezone)
              .format('YYYY-MM-DD')
        : moment(date).format('YYYY-MM-DD');
}

function computeTimePart(date, timezone) {
    if (!date) {
        return '';
    }

    return timezone
        ? moment(date)
              .tz(timezone)
              .format('hh:mm A')
        : moment(date).format('hh:mm A');
}

function computeDate(datePart, timePart, timezone) {
    if (!datePart) {
        return null;
    }

    // Note: It is crucial to call moment.tz( ) instead of moment( ).tz( ).
    // This makes sure that the moment is constructed with the correct timezone.
    return timezone
        ? moment
              .tz(`${datePart} ${timePart}`, 'YYYY-MM-DD hh:mm A', timezone)
              .toDate()
        : moment(`${datePart} ${timePart}`, 'YYYY-MM-DD hh:mm A').toDate();
}
