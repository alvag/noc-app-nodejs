import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins';

interface Attachment {
    filename: string;
    path: string;
}

interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
}

export class EmailService {

    private transporter = nodemailer.createTransport( {
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    } );

    async sendEmail( options: SendMailOptions ): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options;

        try {
            await this.transporter.sendMail( {
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html,
                attachments,
            } );

            return true;
        } catch ( error ) {
            return false;
        }
    }

    sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const html = '<h1>Logs del servidor</h1>';
        const attachments = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            },
        ];

        return this.sendEmail( {
            to,
            html,
            subject,
            attachments,
        } );
    }


}
