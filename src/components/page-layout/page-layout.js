import React from 'react';
import { FullHeightVerticalContainer } from '../basics/containers';
import { Header } from './header';

export class PageLayout extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <FullHeightVerticalContainer>
                <Header>Forms Demo</Header>
                {children}
            </FullHeightVerticalContainer>
        );
    }
}
