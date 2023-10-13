import * as fs from 'fs';
import { LogDatasource } from '../../datasources/log-datasource';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath = 'logs';
    private readonly allLogsPath = `${ this.logPath }/logs-low.log`;
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

    saveLog( log: LogEntity ): Promise<void> {
        return Promise.resolve( undefined );
    }
}
