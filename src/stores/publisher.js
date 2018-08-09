import { action, observable } from 'mobx';

export class Publisher {
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

    static create(jsPublisher) {
        const { id, name } = jsPublisher;
        return new Publisher(id, name);
    }

    clone() {
        return new Publisher(this.id, this.name);
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
