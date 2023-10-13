import { LogDatasource, LogEntity, LogRepository, LogSeverityLevel } from '../../domain';

export class LogRepositoryImpl implements LogRepository {

    constructor( private readonly logDataSource: LogDatasource ) {
    }

    getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        return this.logDataSource.getLogs( severityLevel );
    }

    saveLog( log: LogEntity ): Promise<void> {
        return this.logDataSource.saveLog( log );
    }

}
