import { RouterState, RouterStore } from 'mobx-state-router';
import { BookStore } from './book.store';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    bookStore = new BookStore(this);
    routerStore = new RouterStore(this, routes, notFound);
}
