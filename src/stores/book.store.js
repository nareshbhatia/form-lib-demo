import { action, observable, ObservableMap } from 'mobx';
import { Book } from './book';

export class BookStore {
    rootStore;
    authorMap = new ObservableMap();
    publisherMap = new ObservableMap();
    bookMap = new ObservableMap();

    @observable
    selectedBook;

    @observable
    editedBook;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    selectBook(book) {
        this.selectedBook = book;
        this.editedBook = book;
    }

    @action
    editNewBook() {
        this.selectedBook = null;
        this.editedBook = Book.createNew();
    }

    @action
    setBook(book) {
        this.bookMap.set(book.id, book);
    }
}
