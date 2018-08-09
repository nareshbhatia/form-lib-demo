import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
});

const decorate = withStyles(styles);

export const VerticalDivider = decorate(({ classes }) => (
    <div className={classes.root} />
));
