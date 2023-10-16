import { LogDatasource, LogEntity, LogSeverityLevel } from '../../domain';
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const level = severityEnum[ severityLevel ];

        const logs = await prismaClient.logModel.findMany( {
            where: {
                level,
            },
        } );

        return logs.map( LogEntity.fromObject );
    }

    async saveLog( log: LogEntity ): Promise<void> {
        await prismaClient.logModel.create( {
            data: {
                ...log,
                level: severityEnum[ log.level ],
            },
        } );
    }
}
