import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { MONGO_URI } from '../config/mongo';
import EventModel from '../models/event.model';
import { TOTAL_EVENTS, BATCH_SIZE } from '../config/constants';

const POPULAR_URLS = [
    '/home',
    '/products',
    '/about',
    '/login',
    '/dashboard',
    '/profile',
    '/cart',
    '/checkout',
    '/contact',
    '/plans',
    '/pricing',
    '/faq',
];

const POPULAR_REFERERS = [
    'https://traeloya.com.ni',
    'https://www.hit-cargo.com',
    'https://www.cargofive.com',
    'https://voladitoexpress.com',
    'https://dtlflorida.com.ni',
    'https://optimacargo.com',
    'https://cargaxpress.com',
    'https://www.bluelogistics.com',
    'https://www.cargobox505.com.ni',
    'https://greadystorenic.com',
    'https://shoppexnicaragua.com',
];

enum eventTypes {
    PAGE_VIEW = 'page_view',
    CLICK = 'click',
    SIGNUP = 'signup',
    LOGOUT = 'logout',
    SUBMIT_FORM = 'submit_form',
    SCROLL = 'scroll',
    SCROLL_TO_BOTTOM = 'scroll_to_bottom',
    SCROLL_TO_TOP = 'scroll_to_top',
    SCROLL_TO_LEFT = 'scroll_to_left',
    SCROLL_TO_RIGHT = 'scroll_to_right',
    SCROLL_TO_CENTER = 'scroll_to_center',
}

enum devices {
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
    TABLET = 'tablet',
}

enum browsers {
    CHROME = 'Chrome',
    FIREFOX = 'Firefox',
    SAFARI = 'Safari',
    EDGE = 'Edge',
}

const generateUrl = () => {
    const url = faker.internet.url();
    return faker.helpers.arrayElement(POPULAR_URLS);
}

const generateReferrer = () => {
    return faker.helpers.arrayElement(POPULAR_REFERERS);
}


// -- Event Seeder function --
const generateEvent = () => ({
    userId: `u_${faker.string.uuid()}`,
    sessionId: `s_${faker.string.uuid()}`,
    event: faker.helpers.arrayElement(Object.values(eventTypes)),
    timestamp: faker.date.recent({ days: 30 }),
    metadata: {
        url: generateUrl(),
        referrer: generateReferrer(),
        device: faker.helpers.arrayElement(Object.values(devices)),
        browser: faker.helpers.arrayElement(Object.values(browsers)),
    },
});

const seed = async () => {
    console.time('SeedingTime');
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB (bulkOp)');

    // -- Delete all previous records --
    await EventModel.deleteMany({});
    console.log('All previous events deleted.');

    let inserted = 0;
    const collection = EventModel.collection;

    while (inserted < TOTAL_EVENTS) {
        const bulk = collection.initializeUnorderedBulkOp();
        for (let i = 0; i < BATCH_SIZE && inserted < TOTAL_EVENTS; i++, inserted++) {
            bulk.insert(generateEvent());
        }
        const res = await bulk.execute();
        console.log(
            `Batch insertado: ${inserted}/${TOTAL_EVENTS} (inserted: ${res.insertedCount})`
        );
        await new Promise((res) => setTimeout(res, 50));
    }

    await mongoose.disconnect();
    console.log('Seed completado con BulkOp!');
    console.timeEnd('SeedingTime');
};

seed().catch((err) => {
    console.error('Error en seed:', err);
    process.exit(1);
});
