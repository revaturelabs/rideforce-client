/** Represents possible adress of Users of the system */
export class AddressModel {
    /** The id (and possible key) of the address */
    addressID: number;
    /** First line of the address (house number, Street name) */
    address: string;
    /** Second line of the address */
    address2?: string;
    /** THe City of the address */
    city: string;
    /** The State the address is in */
    state: string;
    /** Represents the zip-code */
    zip: string;
}
