/** Represents possible adress of Users of the system */
export class AddressModel {

    addressID: number;

    //If needed, a second address line can be used. 
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    latitude: string;
    longitude: string;
}
