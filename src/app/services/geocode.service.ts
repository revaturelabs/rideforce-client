import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

/**
 * Provides Specific geolocation services from Google maps
 */
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  /**
   * Enables communication with Google Map services
   */
  geocoder: google.maps.Geocoder;

  /**
   * Sets up the Service with a Google Maps object
   */
  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  /**
   * Attempts to mark a location using a latitude and longitude value
   * @param {google.maps.LatLng} latLng - the location to set up
   * @returns {Observable} - information about your given location
   */
  reverseGeocode(latLng: google.maps.LatLng): Observable<google.maps.GeocoderResult[]> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      // Invokes geocode method of Google Maps API geocoding.
      this.geocoder.geocode({ location: latLng }, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            observer.next(results);
            observer.complete();
          } else {
            console.log('Geocoding service: geocoder failed due to: ' + status);
            observer.error(status);
          }
        })
      );
    });
  }

  /**
   * Attempts to mark a location using an address
   * @param address - the address of a location to obtain information about
   * @returns {Observable<google.maps.GeocoderResult[]>} - information about your given location
   */
  geocode(address: string): Observable<google.maps.GeocoderResult[]> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      // Invokes geocode method of Google Maps API geocoding.
      this.geocoder.geocode({ address: address }, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            observer.next(results);
            observer.complete();
          } else {
            console.log(
              'Geocoding service: geocode was not successful for the following reason: '
              + status
            );
            observer.error(status);
          }
        })
      );
    });
    return null;
  }
}
