import * as fs from 'fs';
import { LogDatasource } from '../../datasources/log-datasource';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath = 'logs';
    private readonly allLogsPath = `${ this.logPath }/logs-all.log`;
    private readonly mediumLogsPath = `${ this.logPath }/logs-medium.log`;
    private readonly highLogsPath = `${ this.logPath }/logs-high.log`;

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if ( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath );
        }

        [ this.allLogsPath, this.mediumLogsPath, this.highLogsPath ]
            .forEach( path => {
                if ( !fs.existsSync( path ) ) {
                    fs.writeFileSync( path, '' );
                }
            } );
    };

    getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        return Promise.resolve( [] );
    }

    async saveLog( log: LogEntity ): Promise<void> {
        const logAsJson = `${ JSON.stringify( log ) }\n`;
        fs.appendFileSync( this.allLogsPath, logAsJson );

        if ( log.level === LogSeverityLevel.low ) return;

        if ( log.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }

    }
}
