import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment-timezone';
import * as yup from 'yup';
import { Book, BookEvent } from '../../stores/book';
import Checkbox from './components/checkbox';
import DurationInput from './components/duration-input';
import MultiSelect from './components/multi-select';
import Select from './components/select';
import TextInput from './components/text-input';
import TransformInput from './components/transform-input';
import { Tz } from './components/tz';

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

                    const { authorMap, publisherMap } = bookStore;

                    const jsBook = this.serialize(
                        bookStore.editedBook,
                        authorMap
                    );

                    const validationSchema = yup.object().shape({
                        title: yup.string().required(),
                        copiesPublished: yup
                            .number()
                            .integer()
                            .positive()
                    });

                    return (
                        <Formik
                            initialValues={jsBook}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const book = this.deserialize(values);
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
                                        {values.isPublished && (
                                            <Field
                                                name="copiesPublished"
                                                component={TransformInput}
                                                label="Copies"
                                                className={classes.copies}
                                                parse={value =>
                                                    value === ''
                                                        ? null
                                                        : Number(value)
                                                }
                                                format={value =>
                                                    value == null
                                                        ? ''
                                                        : String(value)
                                                }
                                            />
                                        )}
                                    </div>
                                    <Field
                                        name="authors"
                                        component={MultiSelect}
                                        label="Authors"
                                        options={Array.from(
                                            authorMap.values()
                                        ).map(author => ({
                                            label: author.name,
                                            value: author.id
                                        }))}
                                        className={classes.selectStyle}
                                    />
                                    <div className={classes.eventExists}>
                                        <Field
                                            name="eventExists"
                                            component={Checkbox}
                                            label="Create event"
                                        />
                                    </div>
                                    {values.eventExists && (
                                        <Fragment>
                                            <Typography variant="title">
                                                Event
                                            </Typography>
                                            <Field
                                                name="event.name"
                                                component={TextInput}
                                                label="Name"
                                                fullWidth
                                            />
                                            <div>
                                                <Field
                                                    name="event.city"
                                                    component={TextInput}
                                                    label="City"
                                                    className={
                                                        classes.textInput
                                                    }
                                                />
                                                <Field
                                                    name="event.timezone"
                                                    component={Tz}
                                                    label="Time Zone"
                                                    className={
                                                        classes.textInput
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    name="event.datePart"
                                                    component={TextInput}
                                                    label="Start Date"
                                                    placeholder="YYYY-MM-DD"
                                                    className={
                                                        classes.textInput
                                                    }
                                                />
                                                <Field
                                                    name="event.timePart"
                                                    component={TextInput}
                                                    label="Time"
                                                    placeholder="hh:mm AM"
                                                    className={
                                                        classes.textInput
                                                    }
                                                />
                                                <Field
                                                    name="event.duration"
                                                    component={DurationInput}
                                                    label="Duration"
                                                    className={
                                                        classes.textInput
                                                    }
                                                />
                                            </div>
                                        </Fragment>
                                    )}

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

                serialize(book, authorMap) {
                    const event = book.bookEvent;
                    const eventExists = !!event;
                    const jsEvent = eventExists
                        ? {
                              name: event.name || '',
                              city: event.city || '',
                              timezone: event.timezone || '',
                              datePart: computeDatePart(
                                  event.startTime,
                                  event.timezone
                              ),
                              timePart: computeTimePart(
                                  event.startTime,
                                  event.timezone
                              ),
                              duration: event.duration || 0
                          }
                        : {
                              name: '',
                              city: '',
                              timezone: '',
                              datePart: '',
                              timePart: '',
                              duration: 0
                          };

                    return {
                        id: book.id || '',
                        title: book.title || '',
                        subtitle: book.subtitle || '',
                        publisherId: book.publisherId || '',
                        authors: book.authorIds
                            ? book.authorIds.map(authorId => ({
                                  label: authorMap.get(authorId).name,
                                  value: authorId
                              }))
                            : [],
                        isPublished: book.isPublished || false,
                        copiesPublished: book.copiesPublished || 0,
                        eventExists: eventExists,
                        event: jsEvent
                    };
                }

                deserialize(jsBook) {
                    const bookEvent = jsBook.eventExists
                        ? new BookEvent(
                              jsBook.event.name,
                              jsBook.event.city,
                              jsBook.event.timezone,
                              computeDate(
                                  jsBook.event.datePart,
                                  jsBook.event.timePart,
                                  jsBook.event.timezone
                              ),
                              jsBook.event.duration
                          )
                        : undefined;
                    return new Book(
                        jsBook.id,
                        jsBook.title,
                        jsBook.subtitle,
                        jsBook.publisherId,
                        jsBook.authors.map(author => author.value),
                        jsBook.isPublished,
                        jsBook.copiesPublished,
                        bookEvent
                    );
                }
            }
        )
    )
);

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
