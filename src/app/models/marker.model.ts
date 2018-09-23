export interface Marker {
    location: google.maps.LatLngLiteral;
    address?: string;
    label?: string;
    userId?: number;
    draggable?: boolean;
    placeId?: string;
    // icon?: string;
    // infoWindow?: boolean;
    // comments?: string[];
    // saved?: boolean;
  }