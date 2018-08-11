import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import createDecorator from 'final-form-calculate';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment-timezone';
import { Form, Field } from 'react-final-form';
import { Book, BookEvent } from '../../stores/book';
import { DateTimeUtils } from '../../utils/datetime-utils';
import { Tz } from './components/tz';
import { Timezone } from '../../components/basics/timezone';
import Checkbox from './components/checkbox';
import Select from './components/select';
import TextField from './components/text-field';

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

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    return errors;
};

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
);

const calculator = createDecorator(
    {
        field: 'eventDatePart', // when eventDatePart changes...
        updates: {
            // ...update eventStartTime
            eventStartTime: (eventDatePart, allValues) =>
                computeDate(
                    allValues.eventDatePart,
                    allValues.eventTimePart,
                    allValues.eventTimezone
                )
        }
    },
    {
        field: 'eventTimePart', // when eventTimePart changes...
        updates: {
            // ...update eventStartTime
            eventStartTime: (eventTimePart, allValues) =>
                computeDate(
                    allValues.eventDatePart,
                    allValues.eventTimePart,
                    allValues.eventTimezone
                )
        }
    }
);

export const BookForm = inject('rootStore')(
    decorate(
        observer(
            class extends React.Component {
                state = {
                    tzRaw: 'America/New_York'
                };

                render() {
                    const {
                        classes,
                        rootStore: { bookStore }
                    } = this.props;

                    const jsBook = bookStore.editedBook
                        ? serialize(bookStore.editedBook)
                        : {};

                    const { publisherMap } = bookStore;

                    return (
                        <Form
                            initialValues={jsBook}
                            validate={validate}
                            onSubmit={this.handleFormSubmit}
                            decorators={[calculator]}
                            render={({ handleSubmit, pristine, invalid }) => (
                                <form
                                    className={classes.root}
                                    onSubmit={handleSubmit}
                                >
                                    <Field
                                        name="title"
                                        component={TextField}
                                        type="text"
                                        label="Title"
                                        fullWidth
                                    />
                                    <Field
                                        name="subtitle"
                                        component={TextField}
                                        type="text"
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
                                        {/* Must mark type as "checkbox" to activate the checked property */}
                                        <Field
                                            name="isPublished"
                                            component={Checkbox}
                                            type="checkbox"
                                            label="Published"
                                        />
                                        <Condition when="isPublished" is={true}>
                                            <Field
                                                name="copiesPublished"
                                                component={TextField}
                                                type="text"
                                                label="Copies"
                                                parse={value =>
                                                    parseInt(value, 10)
                                                }
                                                className={classes.copies}
                                            />
                                        </Condition>
                                    </div>
                                    <div className={classes.eventExists}>
                                        <Field
                                            name="eventExists"
                                            component={Checkbox}
                                            type="checkbox"
                                            label="Create event"
                                        />
                                    </div>
                                    <Condition when="eventExists" is={true}>
                                        <Typography variant="title">
                                            Event
                                        </Typography>
                                        <Field
                                            name="eventName"
                                            component={TextField}
                                            type="text"
                                            label="Name"
                                            fullWidth
                                        />
                                        <div>
                                            <Field
                                                name="eventCity"
                                                component={TextField}
                                                type="text"
                                                label="City"
                                                className={classes.textInput}
                                            />
                                            <Field
                                                name="eventTimezone"
                                                component={Tz}
                                                type="text"
                                                label="Time Zone"
                                                className={classes.textInput}
                                            />
                                            <Timezone
                                                name="timezone-raw"
                                                value={this.state.tzRaw}
                                                label="Time Zone Raw"
                                                onChange={value =>
                                                    this.setState({
                                                        tzRaw: value
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="eventStartTime"
                                                component={TextField}
                                                type="text"
                                                label="Start Time"
                                                className={
                                                    classes.eventStartTime
                                                }
                                            />
                                            <Field
                                                name="eventDatePart"
                                                component={TextField}
                                                type="text"
                                                label="Start Date"
                                                placeholder="YYYY-MM-DD"
                                                className={classes.textInput}
                                            />
                                            <Field
                                                name="eventTimePart"
                                                component={TextField}
                                                type="text"
                                                label="Time"
                                                placeholder="hh:mm AM"
                                                className={classes.textInput}
                                            />
                                            <Field
                                                name="eventDuration"
                                                component={TextField}
                                                type="text"
                                                label="Duration"
                                                placeholder="hh:mm"
                                                parse={value =>
                                                    DateTimeUtils.durationStrToMillis(
                                                        value
                                                    )
                                                }
                                                format={value =>
                                                    DateTimeUtils.millisToDurationStr(
                                                        value
                                                    )
                                                }
                                                className={classes.textInput}
                                            />
                                        </div>
                                    </Condition>

                                    <div className={classes.buttonBar}>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            type="submit"
                                            disabled={pristine || invalid}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                    );
                }

                handleFormSubmit = values => {
                    const {
                        rootStore: { bookStore }
                    } = this.props;
                    const book = deserialize(values);
                    bookStore.setBook(book);
                    bookStore.selectBook(book);
                };
            }
        )
    )
);

function serialize(book) {
    const event = book.bookEvent;
    const eventExists = !!event;
    const eventTimezone = eventExists ? event.timezone : undefined;
    const eventStartTime = eventExists
        ? new Date(event.startTime.getTime())
        : undefined;

    return {
        id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        publisherId: book.publisherId,
        authorIds: book.authorIds ? book.authorIds.slice() : undefined,
        isPublished: book.isPublished,
        copiesPublished: book.copiesPublished,
        eventExists: eventExists,
        eventName: eventExists ? event.name : undefined,
        eventCity: eventExists ? event.city : undefined,
        eventTimezone: eventTimezone,
        eventStartTime: eventStartTime,
        eventDatePart: eventExists
            ? computeDatePart(eventStartTime, eventTimezone)
            : undefined,
        eventTimePart: eventExists
            ? computeTimePart(eventStartTime, eventTimezone)
            : undefined,
        eventDuration: eventExists ? event.duration : undefined
    };
}

function deserialize(jsBook) {
    const bookEvent = jsBook.eventExists
        ? new BookEvent(
              jsBook.eventName,
              jsBook.eventCity,
              jsBook.eventTimezone,
              jsBook.eventStartTime,
              jsBook.eventDuration
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
