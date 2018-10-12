/** Holds a means of contacting a user */
export interface ContactInfo {
    /**
     * The ID of this contact info entry in the database.
     */
    id: Number;
    /** Represente the type of contact info available */
    type: String;
    /**
     * The details specifying the user's username/phone number/etc. on the
     * service.
     */
    info: String;
}
