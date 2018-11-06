/*
 * A generic 401 message
 */
const INVALID_TOKEN_MESSAGE = 'Missing, invalid or expired access token';

/*
 * Helper methods to return responses
 */
export class ResponseHandler {

    /*
     * Return data to the caller, which could be a success or error object
     */
    public static objectResponse(statusCode: number, data: any): any {

        return {
            statusCode,
            body: JSON.stringify(data),
        };
    }

    /*
     * Return a missing token response to the caller
     */
    public static missingTokenResponse(): any {

        return {
            statusCode: 401,
            headers: {
                'WWW-Authenticate': 'Bearer',
            },
            body: JSON.stringify(INVALID_TOKEN_MESSAGE),
        };
    }

    /*
     * Return an invalid token response to the caller
     */
    public static invalidTokenResponse(): any {

        return {
            statusCode: 401,
            headers: {
                'WWW-Authenticate': 'Bearer, error=invalid_token',
            },
            body: JSON.stringify(INVALID_TOKEN_MESSAGE),
        };
    }
}