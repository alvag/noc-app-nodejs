import { LogRepository } from '../../repository';
import { LogEntity, LogSeverityLevel } from '../../entities';

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback,
    ) {
    }

    private callLogs( log: LogEntity ): void {
        this.logRepositories.forEach( logRepository => {
            logRepository.saveLog( log );
        } );
    }

    async execute( url: string ): Promise<boolean> {
        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( `Error on check service ${ url }` );
            }

            const log = new LogEntity( {
                message: `${ url } is OK`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts',
            } );
            this.callLogs( log );

            this.successCallback && this.successCallback();

            return true;
        } catch ( error ) {
            const message = `${ url } - ${ error }`;
            const log = new LogEntity( { message, level: LogSeverityLevel.high, origin: 'check-service.ts' } );
            this.callLogs( log );
            this.errorCallback && this.errorCallback( message );
            return false;
        }
    }
}
