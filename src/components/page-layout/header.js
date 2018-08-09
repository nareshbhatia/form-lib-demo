import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
    title: {
        flex: 1,
        fontSize: 18
    }
};

const decorate = withStyles(styles);

export const Header = decorate(({ classes, children }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography
                variant="title"
                color="inherit"
                className={classes.title}
            >
                {children}
            </Typography>
        </Toolbar>
    </AppBar>
));
