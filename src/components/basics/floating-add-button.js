import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    floatingAddButton: {
        position: 'absolute',
        right: 30,
        bottom: 20
    }
};

const decorate = withStyles(styles);

export const FloatingAddButton = decorate(({ classes, onClick }) => (
    <Button
        variant="fab"
        color="primary"
        className={classes.floatingAddButton}
        onClick={onClick}
    >
        <AddIcon />
    </Button>
));
