import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddressModel } from '../models/address.model';
import { Location } from '../models/location.model';

/**
 * Provides Specific geolocation services from Google maps
 */
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  endpoint: string = environment.mapUrl + '/location/?address=';

  /**
   * Sets up the Service with a Google Maps object
   */
  constructor(private http: HttpClient) {

  }

  /**
   * Attempts to mark a location using an address
   * @param address - the address of a location to obtain information about
   * @returns {Observable<google.maps.GeocoderResult[]>} - information about your given location
   */
  geocode(address: string): Observable<object> {
    console.log("address   " + address)
    address = address.substr(0, address.length - 3);
    return this.http.get(this.endpoint + address);
  }

  //Get the location of a given address model and populate the lat/lon
  getlocation(location: Location): Observable<Location> {
    let refractoredAddress = location.address.substr(0, location.address.length- 3);
    console.log(refractoredAddress);
    return this.http.get<Location>(this.endpoint + refractoredAddress);
  }
}
