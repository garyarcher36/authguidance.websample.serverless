import {Context} from 'aws-lambda';
import middy from 'middy';
import {cors, ICorsOptions} from 'middy/middlewares';
import {Configuration} from '../configuration/configuration';
import {AuthorizationMicroservice} from '../logic/authorizationMicroservice';
import {claimsMiddleware} from '../plumbing/claimsMiddleware';
import {exceptionMiddleware} from './exceptionMiddleware';

/*
 * Set up middleware
 */
export class MiddlewareHelper {

    private _apiConfig: Configuration;
    private _authorizationMicroservice: AuthorizationMicroservice;
    private _corsConfig: ICorsOptions;

    /*
     * Receive dependencies
     */
    public constructor(apiConfig: Configuration, authorizationMicroservice: AuthorizationMicroservice) {
        this._apiConfig = apiConfig;
        this._authorizationMicroservice = authorizationMicroservice;
        this._corsConfig = {origins: apiConfig.app.trustedOrigins};
    }

    /*
     * Add cross cutting concerns to enrich the API operation
     * Middy works by always calling all middlewares, including the main operation
     */
    public enrichApiOperation(operation: any): middy.IMiddy {

        return middy(async (event: any, context: Context) => {

                // If authorization has failed we do not call the business entry point
                if (event.claims) {
                    return await operation(event, context);
                }
            })
            .use(claimsMiddleware(this._apiConfig, this._authorizationMicroservice))
            .use(cors(this._corsConfig))
            .use(exceptionMiddleware());
    }
}