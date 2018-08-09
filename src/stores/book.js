import { action, observable } from 'mobx';
import { v4 } from 'uuid';
import { DateTimeUtils } from '../utils/datetime-utils';

export class BookEvent {
    @observable
    name;
    @observable
    city;
    @observable
    timezone;
    @observable
    startTime;
    @observable
    duration;

    /**
     * @param {string} name
     * @param {string} city
     * @param {string} timezone
     * @param {Date} [startTime]
     * @param {number} [duration] (milliseconds)
     */
    constructor(name, city, timezone, startTime, duration) {
        this.name = name;
        this.city = city;
        this.timezone = timezone;
        this.startTime = startTime;
        this.duration = duration;
    }

    static create(jsBookEvent) {
        const { name, city, timezone, startTime, duration } = jsBookEvent;
        return new BookEvent(
            name,
            city,
            timezone,
            new Date(startTime),
            DateTimeUtils.durationStrToMillis(duration)
        );
    }

    clone() {
        return new BookEvent(
            this.name,
            this.city,
            this.timezone,
            new Date(this.startTime.getTime()),
            this.duration
        );
    }

    @action
    setName(name) {
        this.name = name;
    }

    @action
    setCity(city) {
        this.city = city;
    }

    @action
    setTimezone(timezone) {
        this.timezone = timezone;
    }

    @action
    setStartTime(startTime) {
        this.startTime = startTime;
    }

    @action
    setDuration(duration) {
        this.startTime = duration;
    }
}

export class Book {
    @observable
    id;
    @observable
    title;
    @observable
    subtitle;
    @observable
    publisherId;
    @observable
    authorIds;
    @observable
    isPublished;
    @observable
    copiesPublished;
    @observable
    bookEvent;

    /**
     * @param {string} id
     * @param {string} title
     * @param {string} subtitle
     * @param {string} publisherId
     * @param {string[]} authorIds
     * @param {boolean} isPublished
     * @param {number} copiesPublished
     * @param {BookEvent} bookEvent
     */
    constructor(
        id,
        title,
        subtitle,
        publisherId,
        authorIds,
        isPublished,
        copiesPublished,
        bookEvent
    ) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.publisherId = publisherId;
        this.authorIds = authorIds;
        this.isPublished = isPublished;
        this.copiesPublished = isPublished ? copiesPublished : undefined;
        this.bookEvent = bookEvent;
    }

    static create(jsBook) {
        const {
            id,
            title,
            subtitle,
            publisherId,
            authorIds,
            isPublished,
            copiesPublished,
            bookEvent: jsBookEvent
        } = jsBook;
        const bookEvent = jsBookEvent
            ? BookEvent.create(jsBookEvent)
            : undefined;
        return new Book(
            id,
            title,
            subtitle,
            publisherId,
            authorIds,
            isPublished,
            copiesPublished,
            bookEvent
        );
    }

    static createNew() {
        return new Book(v4());
    }

    clone() {
        return new Book(
            this.id,
            this.title,
            this.subtitle,
            this.publisherId,
            this.authorIds ? this.authorIds.slice() : undefined,
            this.isPublished,
            this.copiesPublished,
            this.bookEvent ? this.bookEvent.clone() : undefined
        );
    }

    @action
    setId(id) {
        this.id = id;
    }

    @action
    setTitle(title) {
        this.title = title;
    }

    @action
    setSubtitle(subtitle) {
        this.subtitle = subtitle;
    }

    @action
    setPublisherId(publisherId) {
        this.publisherId = publisherId;
    }

    @action
    setAuthorIds(authorIds) {
        this.authorIds = authorIds;
    }

    @action
    setPublished(isPublished) {
        this.isPublished = isPublished;
    }

    @action
    setCopiesPublished(copiesPublished) {
        this.copiesPublished = copiesPublished;
    }

    @action
    setBookEvent(bookEvent) {
        this.bookEvent = bookEvent;
    }
}
