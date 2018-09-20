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
}