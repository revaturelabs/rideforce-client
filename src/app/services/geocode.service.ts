import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Provides Specific geolocation services from Google maps
 */
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  dev: boolean = false;
  endpoint: string = this.dev ? 'http://localhost:3333/location/?address=' : environment.apiUrl + '/location/?address=';

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
}
