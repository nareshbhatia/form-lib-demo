import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { inject, observer } from 'mobx-react';

export const BookList = inject('rootStore')(
    observer(({ classes, rootStore: { bookStore }, onSelectBook }) => {
        const { bookMap, selectedBook } = bookStore;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Book</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(bookMap.values()).map(book => (
                        <TableRow
                            hover
                            key={book.id}
                            selected={book === selectedBook}
                            onClick={() => onSelectBook(book)}
                        >
                            <TableCell>{book.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    })
);
