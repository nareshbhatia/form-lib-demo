import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import {
    CustomFormPage,
    FinalFormPage,
    FormikPage,
    NotFoundPage
} from './features';

const styles = theme => ({
    '@global': {
        html: {
            height: '100%',
            boxSizing: 'border-box'
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit'
        },
        body: {
            height: '100%',
            margin: 0,
            background: theme.palette.background.default,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            color: theme.palette.text.primary,

            // Helps fonts on OSX look more consistent with other systems
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',

            // Use momentum-based scrolling on iOS devices
            WebkitOverflowScrolling: 'touch'
        },
        '#root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    },
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
});

const viewMap = {
    finalForm: <FinalFormPage />,
    formik: <FormikPage />,
    custom: <CustomFormPage />,
    notFound: <NotFoundPage />
};

const decorate = withStyles(styles);

export const Shell = inject('rootStore')(
    decorate(({ classes, rootStore }) => {
        const { routerStore } = rootStore;

        return (
            <div className={classes.root}>
                <RouterView routerStore={routerStore} viewMap={viewMap} />
            </div>
        );
    })
);
