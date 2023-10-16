import { LogRepositoryImpl, MongoLogDatasource } from '../infrastructure';

const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoLogDatasource(),
);

export class Server {
    static start(): void {
        console.log( 'Server started...' );

        /* new SendEmailLogs(
             new EmailService(),
             logRepository,
         ).execute( 'alva85@gmail.com' );*/

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
                    logRepository,
                    () => console.log( `${ url } is OK` ),
                    ( error ) => console.error( error ),
                ).execute( url );
            },
        );*/
    }
}
