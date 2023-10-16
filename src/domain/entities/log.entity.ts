export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityProps {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt: Date;

    constructor( props: LogEntityProps ) {
        const { message, level, origin, createdAt = new Date() } = props;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson( json: string ): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse( json );
        return new LogEntity( { message, level, createdAt, origin } );
    }

    static fromObject( json: string = '{}' ): LogEntity {
        json = json === '' ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse( json );
        return new LogEntity( { message, level, createdAt, origin } );
    }
}
