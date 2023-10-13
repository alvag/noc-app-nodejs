export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    createdAt: Date;

    constructor( public message: string, public level: LogSeverityLevel ) {

        this.createdAt = new Date();
    }
}
