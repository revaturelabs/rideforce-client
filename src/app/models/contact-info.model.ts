/** Holds a means of contacting a user */
export class ContactInfo {
    /**
     * The ID of this contact info entry in the database.
     */
    id: Number;

    /** Represent the type of contact info available */
    
    type: String;
    /**
     * The details specifying the user's username/phone number/etc. on the
     * service.
     */
    info: String;
}
