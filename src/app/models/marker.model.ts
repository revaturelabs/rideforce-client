/** Represents an object that could appear on a map */
export interface Marker {
    /** the actual location on the map */
    location: google.maps.LatLngLiteral;
    /** The address the marker represents */
    address?: string;
    /** Any Identifier a User might use */
    label?: string;
    /** Does it represent any specific user */
    userId?: number;
    /** Can it move around */
    draggable?: boolean;
    /** Extra identification for the marker */
    placeId?: string;
    // icon?: string;
    // infoWindow?: boolean;
    // comments?: string[];
    // saved?: boolean;
  }