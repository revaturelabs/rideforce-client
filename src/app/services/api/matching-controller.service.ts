import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../../../app/models/user.model";
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../../models/link.model';
import { Filter } from '../../models/filter';

@Injectable()
export class MatchingControllerService {

  constructor(private http: HttpClient) { }

  /**
   * will deserialize the link object. returns the object reference from the link
   * a link is a reference to the object without having to fetch the object from the database
   * @param uri 
   */
  getFromLink(uri: Link<any>): Observable<any> {
    return this.http.get<any>(environment.apiUrl + uri);
  }
  /**
   * Returns all drivers who match the rider with the given user ID.
   * "/users/{userid}"
   * 
   * @param riderId
   */
  getMatchingDrivers(riderId: number): Observable<Link<User>[]> {
   
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/${riderId}`);
  }

  getFilteredDrivers(riderId: number, filter: Filter): Promise<User[]> {
    let body = {
      filter,
      riderId
    }
    return this.http.post<User[]>(environment.apiUrl + `matches/filtered`, body).toPromise();
  }

  /**
   * Returns all users liked by the user with the given ID.
   * Returns this as an array of strings in the format
   * 
   * @param riderId 
   */
  getLikedDrivers(riderId: number): Observable<Link<User>[]> {
    console.log(environment.apiUrl + `/matches/likes/${riderId}`);
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id likes the user with ID :liked.
   * 
   * @param riderId 
   * @param driverId 
   */
  likeDriver(riderId: number, driverId: number): Observable<string[]> {
    
    return this.http.put<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}/${driverId}`, '');

  }

  /**
   * Removes any indication that the user with ID :id likes the user with ID :liked
   * 
   * @param riderId 
   * @param driverId 
   */
  unlikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.delete<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}/${driverId}`);
  }

  /**
   * Returns all users disliked by the user with the given ID
   * @param riderId 
   */
  getDislikedDrivers(riderId: number): Observable<Link<User>[]> {
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id unliked the user with ID :liked.
   * 
   * @param riderId 
   * @param driverId 
   */
  dislikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.put<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}/${driverId}`, '');
  }

  /**
   *  Removes any indication that the user with ID :id disliked the user with ID :liked
   * 
   * @param riderId 
   * @param driverId 
   */
  unDislikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.delete<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}/${driverId}`);
  }
}
