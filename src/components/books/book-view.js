import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import { DateTimeUtils } from '../../utils/datetime-utils';

const styles = theme => ({
    root: {
        minHeight: 250
    },
    header: {
        marginBottom: theme.spacing.unit
    },
    eventTitle: {
        marginTop: theme.spacing.unit,
        fontSize: 16
    }
});

const decorate = withStyles(styles);

export const BookView = inject('rootStore')(
    decorate(
        observer(({ classes, rootStore: { bookStore } }) => {
            const { authorMap, publisherMap, selectedBook } = bookStore;
            if (!selectedBook) {
                return null;
            }

            const {
                title,
                subtitle,
                publisherId,
                authorIds,
                isPublished,
                copiesPublished,
                bookEvent
            } = selectedBook;

            const publisher = publisherId
                ? publisherMap.get(publisherId).name
                : undefined;

            const authors =
                authorIds && authorIds.length > 0
                    ? authorIds
                          .map(authorId => authorMap.get(authorId).name)
                          .join(', ')
                    : undefined;

            return (
                <Card className={classes.root}>
                    <CardContent>
                        <header className={classes.header}>
                            <Typography variant="title">{title}</Typography>
                            {subtitle && (
                                <Typography variant="subheading">
                                    {subtitle}
                                </Typography>
                            )}
                        </header>

                        {publisher && (
                            <Typography>
                                <em>Publisher:</em> {publisher}
                            </Typography>
                        )}

                        {authors && (
                            <Typography>
                                <em>
                                    {authorIds.length === 1
                                        ? 'Author'
                                        : 'Authors'}
                                    :
                                </em>{' '}
                                {authors}
                            </Typography>
                        )}

                        <Typography>
                            <em>Published:</em> {isPublished ? 'Yes' : 'No'}
                            {copiesPublished
                                ? ` (${copiesPublished} copies)`
                                : ''}
                        </Typography>

                        {bookEvent && (
                            <Fragment>
                                <Typography
                                    variant="title"
                                    color="primary"
                                    className={classes.eventTitle}
                                >
                                    Event
                                </Typography>
                                <Typography>
                                    {bookEvent.name} in {bookEvent.city}
                                </Typography>
                                <Typography>
                                    {DateTimeUtils.timeToShortStr(
                                        bookEvent.startTime,
                                        bookEvent.timezone
                                    )}
                                </Typography>
                                <Typography>
                                    Duration:{' '}
                                    {DateTimeUtils.millisToDurationStr(
                                        bookEvent.duration
                                    )}
                                </Typography>
                            </Fragment>
                        )}
                    </CardContent>
                </Card>
            );
        })
    )
);
