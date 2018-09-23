import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LatLngLiteral } from '@agm/core';
import { RouteInfo } from '../../models/route-info.model';

@Injectable()
export class MapsControllerService {

 public constructor(private http: HttpClient) { }

  /** 
  * Sends address as string to location endpoint in Map Service. Map Service returns geographic location
  * in latitude and longitude as a LatLngLiteral. This can be used to create map markers.
  */                                        
  getDistance(address: string): Observable<LatLngLiteral> { // gives back latitude and longitude
    return this.http.get<LatLngLiteral>(environment.apiUrl + '/location', {
      params: { address },
    });
  }

  /**
   * Takes in 2 addresses and calculates the distance and travel time between them
   * 
   * @param start string address
   * @param end string address
   */
  public getRoute(start: string, end: string): Observable<RouteInfo> { // gives back latitude and longitude
    
    return this.http.get<RouteInfo>(environment.apiUrl + '/route', {
      params: { start, end },
    });
  }
}