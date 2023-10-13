import { CronService } from './cron/cron-service';
import { CheckService } from '../domain';
import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure';

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource() );

export class Server {
    static start(): void {
        console.log( 'Server started...' );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log( `${ url } is OK` ),
                    ( error ) => console.error( error ),
                ).execute( url );
            },
        );
    }
}
