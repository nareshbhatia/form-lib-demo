import { action, observable } from 'mobx';

export class Author {
    @observable
    id;
    @observable
    name;

    /**
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static create(jsAuthor) {
        const { id, name } = jsAuthor;
        return new Author(id, name);
    }

    clone() {
        return new Author(this.id, this.name);
    }

    @action
    setId(id) {
        this.id = id;
    }

    @action
    setName(name) {
        this.name = name;
    }
}
