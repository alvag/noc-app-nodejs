import { LogDatasource, LogEntity, LogSeverityLevel } from '../../domain';
import { LogModel } from '../../data/mongo';

export class MongoLogDatasource implements LogDatasource {
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const logs = await LogModel.find( {
            level: severityLevel,
        } );

        return logs.map( LogEntity.fromObject );
    }

    async saveLog( log: LogEntity ): Promise<void> {
        await LogModel.create( log );
    }
}
