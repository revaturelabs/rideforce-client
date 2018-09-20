export interface ContactInfo {
    /**
     * The ID of this contact info entry in the database.
     */
    id: Number;
    type: ContactInfoType;
    /**
     * The details specifying the user's username/phone number/etc. on the
     * service.
     */
    info: String;
}