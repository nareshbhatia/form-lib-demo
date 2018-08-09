import { Author } from './author';
import { Book } from './book';
import { Publisher } from './publisher';
import { RootStore } from './root.store';

const authors = [
    {
        id: 'erich-gamma',
        name: 'Erich Gamma'
    },
    {
        id: 'richard-helm',
        name: 'Richard Helm'
    },
    {
        id: 'ralph-johnson',
        name: 'Ralph Johnson'
    },
    {
        id: 'john-vlissides',
        name: 'John Vlissides'
    },
    {
        id: 'martin-fowler',
        name: 'Martin Fowler'
    },
    {
        id: 'eric-evans',
        name: 'Eric Evans'
    },
    {
        id: 'douglas-crockford',
        name: 'Douglas Crockford'
    }
];

const publishers = [
    {
        id: 'addison-wesley',
        name: 'Addison Wesley'
    },
    {
        id: 'o-reilly',
        name: 'O’Reilly'
    }
];

const books = [
    {
        id: 'design-patterns',
        title: 'Design Patterns',
        subtitle: 'Elements of Reusable Object-Oriented Software',
        publisherId: 'addison-wesley',
        authorIds: [
            'erich-gamma',
            'richard-helm',
            'ralph-johnson',
            'john-vlissides'
        ],
        isPublished: true,
        copiesPublished: 10000,
        bookEvent: {
            name: 'Book Signing',
            city: 'New York',
            timezone: 'America/New_York',
            startTime: '2018-05-01T09:00:00-04:00',
            duration: 'PT1H'
        }
    },
    {
        id: 'refactoring',
        title: 'Refactoring',
        subtitle: 'Improving the Design of Existing Code',
        publisherId: 'addison-wesley',
        authorIds: ['martin-fowler'],
        isPublished: true,
        copiesPublished: 5000,
        bookEvent: {
            name: 'Book Signing',
            city: 'San Francisco',
            timezone: 'America/Los_Angeles',
            startTime: '2018-05-02T09:00:00-07:00',
            duration: 'PT1H'
        }
    },
    {
        id: 'patterns-of-enterprise-application-architecture',
        title: 'Patterns of Enterprise Application Architecture',
        publisherId: 'addison-wesley',
        authorIds: ['martin-fowler'],
        isPublished: true,
        copiesPublished: 5000,
        bookEvent: {
            name: 'Book Signing',
            city: 'London',
            timezone: 'Etc/GMT',
            startTime: '2018-05-03T09:00:00-00:00',
            duration: 'PT1H'
        }
    },
    {
        id: 'domain-driven-design',
        title: 'Domain-Driven Design',
        publisherId: 'addison-wesley',
        authorIds: ['eric-evans'],
        isPublished: true,
        copiesPublished: 10000,
        bookEvent: {
            name: 'Book Signing',
            city: 'Bangalore',
            timezone: 'Asia/Calcutta',
            startTime: '2018-05-04T09:00:00+05:30',
            duration: 'PT1H'
        }
    },
    {
        id: 'javascript',
        title: 'JavaScript',
        subtitle: 'The Good Parts',
        publisherId: 'o-reilly',
        authorIds: ['douglas-crockford'],
        isPublished: false
    },
    {
        id: 'mastering-react',
        title: 'Mastering React'
    }
];

export function createRootStore() {
    const rootStore = new RootStore();
    const { bookStore } = rootStore;

    authors.forEach(author => {
        bookStore.authorMap.set(author.id, Author.create(author));
    });

    publishers.forEach(publisher => {
        bookStore.publisherMap.set(publisher.id, Publisher.create(publisher));
    });

    books.forEach(book => {
        bookStore.bookMap.set(book.id, Book.create(book));
    });

    return rootStore;
}
