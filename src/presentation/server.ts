import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource() );

export class Server {
    static start(): void {
        console.log( 'Server started...' );

        new SendEmailLogs(
            new EmailService(),
            fileSystemLogRepository,
        ).execute( 'alva85@gmail.com' );

        // const emailService = new EmailService();
        /* emailService.sendEmail( {
             to: 'alva85@gmail.com',
             subject: 'Test',
             html: '<h1>Test</h1>',
         } ).then( console.log ).catch( console.log );*/

        /*emailService.sendEmailWithFileSystemLogs( 'alva85@gmail.com' )
            .then( console.log )
            .catch( console.log );*/

        /*CronService.createJob(
            '*!/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log( `${ url } is OK` ),
                    ( error ) => console.error( error ),
                ).execute( url );
            },
        );*/
    }
}
