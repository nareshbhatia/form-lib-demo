import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fullHeightHorizontalContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    fullHeightVerticalContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    centeredContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing.unit
    },
    scrollingContainer: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing.unit
    }
});

const decorate = withStyles(styles);

/**
 * FullHeightHorizontalContainer - parent should be flex-direction: column
 */
export const FullHeightHorizontalContainer = decorate(
    ({ classes, children }) => (
        <div className={classes.fullHeightHorizontalContainer}>{children}</div>
    )
);

/**
 * FullHeightVerticalContainer - parent should be flex-direction: column
 */
export const FullHeightVerticalContainer = decorate(({ classes, children }) => (
    <div className={classes.fullHeightVerticalContainer}>{children}</div>
));

/**
 * CenteredContainer - parent should be flex-direction: column
 */
export const CenteredContainer = decorate(({ classes, children }) => (
    <div className={classes.centeredContainer}>{children}</div>
));

/**
 * ScrollingContainer
 */
export const ScrollingContainer = decorate(({ classes, children }) => (
    <div className={classes.scrollingContainer}>{children}</div>
));
