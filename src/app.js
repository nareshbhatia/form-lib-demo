import React from 'react';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';
import { createRootStore } from './stores';
import { history } from './utils/history';
import { Shell } from './shell';

// Create the rootStore
const rootStore = createRootStore();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

class App extends React.Component {
    render() {
        const palette = {
            primary: {
                main: blue[500]
            },
            secondary: {
                main: pink.A400
            }
        };
        const theme = createMuiTheme({ palette });

        return (
            <MuiThemeProvider theme={theme}>
                <Provider rootStore={rootStore}>
                    <Shell />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
