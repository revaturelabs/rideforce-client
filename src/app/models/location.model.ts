/** Represents possible adress of Users of the system */
export class Location {
    //Some if by which locations are cached.
    addressID: number;

    //If needed, a second address line can be used. 
    address: string;
    //address2?: string;
    city: string;
    stateCode: string;
    zip: string;
    latitude: number;
    longitude: number;
}