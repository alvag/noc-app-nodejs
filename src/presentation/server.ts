import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class Server {
    static start(): void {
        console.log( 'Server started...' );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    () => console.log( `${ url } is OK` ),
                    ( error ) => console.error( error ),
                ).execute( url );
            },
        );
    }
}
