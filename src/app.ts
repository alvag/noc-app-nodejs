import 'dotenv/config';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

( () => {
    main();
} )();

async function main() {
    await MongoDatabase.connect( {
        mongoUrl: process.env.MONGODB_URL || '',
        dbName: process.env.MONGODB_NAME || '',
    } );

    Server.start();
}
