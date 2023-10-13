import { LogRepository } from '../../repository';
import { LogEntity, LogSeverityLevel } from '../../entities';

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback,
    ) {
    }

    async execute( url: string ): Promise<boolean> {
        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( `Error on check service ${ url }` );
            }

            const log = new LogEntity( `${ url } is OK`, LogSeverityLevel.low );
            this.logRepository.saveLog( log );

            this.successCallback && this.successCallback();

            return true;
        } catch ( error ) {
            const errorMessage = `${ url } - ${ error }`;
            const log = new LogEntity( errorMessage, LogSeverityLevel.high );
            this.logRepository.saveLog( log );
            this.errorCallback && this.errorCallback( errorMessage );
            return false;
        }
    }
}
