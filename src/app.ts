import 'dotenv/config';
import { envs } from './config/plugins';

( () => {
    main();
} )();

function main() {
    // Server.start();
    console.log( envs );
}
