import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import {
    BookList,
    BookView,
    FloatingAddButton,
    FullHeightHorizontalContainer,
    PageLayout,
    ScrollingContainer,
    VerticalDivider
} from '../../components';
import { BookForm } from './book-form';

const styles = {
    master: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 300
    }
};

const decorate = withStyles(styles);

export const CustomFormPage = inject('rootStore')(
    decorate(
        observer(
            class extends React.Component {
                render() {
                    const { classes } = this.props;

                    return (
                        <PageLayout>
                            <FullHeightHorizontalContainer>
                                <div className={classes.master}>
                                    <ScrollingContainer>
                                        <BookList
                                            onSelectBook={this.handleSelectBook}
                                        />
                                    </ScrollingContainer>
                                    <FloatingAddButton
                                        onClick={this.handleAddBook}
                                    />
                                </div>
                                <VerticalDivider />
                                <ScrollingContainer>
                                    <BookView />
                                    <BookForm />
                                </ScrollingContainer>
                            </FullHeightHorizontalContainer>
                        </PageLayout>
                    );
                }

                handleAddBook = () => {
                    const {
                        rootStore: { bookStore }
                    } = this.props;
                    bookStore.editNewBook();
                };

                handleSelectBook = book => {
                    const {
                        rootStore: { bookStore }
                    } = this.props;
                    bookStore.selectBook(book);
                };
            }
        )
    )
);
