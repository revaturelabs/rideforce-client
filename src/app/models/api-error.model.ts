/**
 * Represents an error that accompanied the response to an HTTP request
 */
export interface ApiError {
    /**
     * The primary message corresponding to the error.
     */
    message: String;
    /**
     * Any additional details, such which fields were missing/incorrect in a
     * request format error. An empty array indicates that there are no such
     * details.
     */
    details: String[];
    /**
   * The HTTP status that accompanied the error. This is not returned by the
   * API, but is provided as a convenience by the ErrorInterceptor.
   */
    status: number;
    /**
    * The type of the error, if a specific type can be associated.
    */
    type?: ApiErrorType;
}

/**
 * A specific type of error which can be returned by the API.
 */
export enum ApiErrorType {
    /**
     * The user is not logged in.
     */
    NotLoggedIn = 'NOT_LOGGED_IN',
    /**
     * The user is logged in, but does not have permission to access an endpoint.
     */
    Unauthorized = 'UNAUTHORIZED',
}
