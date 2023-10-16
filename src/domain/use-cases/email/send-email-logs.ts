import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository';
import { LogEntity, LogSeverityLevel } from '../../entities';

interface SendLogEmailUseCase {
    execute( to: string | string[] ): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {
    }

    async execute( to: string | string[] ): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs( to );
            if ( !sent ) {
                throw new Error( 'Error sending email' );
            }

            const log = new LogEntity( {
                message: 'Email sent',
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts',
            } );
            this.logRepository.saveLog( log );

            return true;
        } catch ( error ) {
            const log = new LogEntity( {
                message: `${ error }`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts',
            } );
            this.logRepository.saveLog( log );
            return false;
        }
    }
}
