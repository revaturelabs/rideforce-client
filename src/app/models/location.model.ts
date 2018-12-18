/** Represents a specific location on Earth */
export interface Location {
    /** Cached ID */
    cached_id: number;
    /** Address */ 
    address: String;
    /** City */
    city: String;
    /** State code */
    state_code: String;
    /** ZIP Code */
    zip_code: number;
    /** the North/West value of the location */
    latitude: number;
    /** The East/West value of the location */
    longitude: number;

}
