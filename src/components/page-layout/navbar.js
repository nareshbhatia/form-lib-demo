import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

const styles = {
    root: {
        flex: '0 0 54px'
    }
};

const decorate = withStyles(styles);

export const NavBar = inject('rootStore')(
    decorate(
        observer(
            class extends React.Component {
                static propTypes = {
                    rootStore: PropTypes.object.isRequired
                };

                render() {
                    const { classes, rootStore } = this.props;
                    const { routeName } = rootStore.routerStore.routerState;
                    const tab = this.routeToTab(routeName);

                    return (
                        <div className={classes.root}>
                            <Tabs value={tab} onChange={this.onTabChange}>
                                <Tab label="Final Form" />
                                <Tab label="Formik" />
                            </Tabs>
                        </div>
                    );
                }

                onTabChange = (event, value) => {
                    const { rootStore } = this.props;
                    rootStore.routerStore.goTo(this.tab2route(value));
                };

                routeToTab(route) {
                    const map = {
                        finalForm: 0,
                        formik: 1
                    };
                    return map[route];
                }

                tab2route(tab) {
                    const routes = ['finalForm', 'formik'];
                    return routes[tab];
                }
            }
        )
    )
);
