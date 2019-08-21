/** Represents possible adress of Users of the system */
export class Location {
    //Some if by which locations are cached.
    // addressID: number;
    id: number;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    latitude: number;
    longitude: number;
}
