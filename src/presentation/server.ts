import { CronService } from './cron/cron-service';

export class Server {
    static start(): void {
        console.log( 'Server started...' );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();
                console.log( 'Tick!', date );
            },
        );
    }
}
