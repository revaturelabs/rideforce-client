import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../app/models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../../models/link.model';
import { Filter } from '../../models/filter';

/**
 * Manages User's interactions with other users on Rideshare
 */
@Injectable()
export class MatchingControllerService {

  /**
   * Sets up the Service with an HTTPClient injection
   * @param http - provides the means of interacting with the HTTP servier
   */
  constructor(private http: HttpClient) { }

  /**
   * will deserialize the link object. returns the object reference from the link
   * a link is a reference to the object without having to fetch the object from the database
   * @param {Link<any>} uri - the mapping to a specific user
   * @returns {Observable<any>} - anthing that might be returned
   */
  getFromLink(uri: Link<any>): Observable<any> {
    return this.http.get<any>(environment.apiUrl + uri);
  }
  /**
   * Returns all drivers who match the rider with the given user ID.
   * "/users/{userid}"
   *
   * @param {number} riderId - the id of the rider making the request
   * @returns {Observable<Link<User>[]>} - the list of drivers that "match" the user
   */
  getMatchingDrivers(riderId: number): Observable<Link<User>[]> {

    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/${riderId}`);
    //return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/${riderId}`);
  }

  /**
   * Returns Users who have passed the given filter and resemble the User enough to be returned
   * @param riderId - the rider making the request
   * @param filter - the specific filters to add to the request
   * @returns {Promise<User[]>} - the list of Users that pass the filter specifications
   */
  getFilteredDrivers(riderId: number, filter: Filter): Promise<User[]> {
    const body = {
      filter,
      riderId
    };
    return this.http.post<User[]>(environment.apiUrl + `matches/filtered`, body).toPromise();
  }

  /**
   * Returns all users liked by the user with the given ID.
   * Returns this as an array of strings in the format
   *
   * @param {number} riderId - the rider making the request
   * @returns {Observable<Link<User>[]>} - list of Users the User 'liked'
   */
  getLikedDrivers(riderId: number): Observable<Link<User>[]> {
    console.log(environment.apiUrl + `/matches/likes/${riderId}`);
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id likes the user with ID :liked.
   *
   * @param {number} riderId - the rider making the request
   * @param {number} driverId - the driver the rider now likes
   * @returns {Observable<string[]>} - Does not actually return anything
   */
  likeDriver(riderId: number, driverId: number): Observable<string[]> {

    return this.http.put<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}/${driverId}`, '');

  }

  /**
   * Removes any indication that the user with ID :id likes the user with ID :liked
   *
   * @param {number} riderId - the rider making the request
   * @param {number} driverId - the driver the rider now dislikes
   * @returns {Observable<string[]>} - Does not actually return anything
   */
  unlikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.delete<Link<User>[]>(environment.apiUrl + `/matches/likes/${riderId}/${driverId}`);
  }

  /**
   * Returns all users disliked by the user with the given ID
   * @param {number} riderId - the rider making the request
   * @returns {Observable<Link<User>[]>} - the list of drivers the user disliked
   */
  getDislikedDrivers(riderId: number): Observable<Link<User>[]> {
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id unliked the user with ID :liked.
   *
   * @param {number} riderId - the rider making the request
   * @param {number} driverId - the driver to affect
   * @returns {Observable<string[]>} - Does not actually return anything
   */
  dislikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.put<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}/${driverId}`, '');
  }

  /**
   *  Removes any indication that the user with ID :id disliked the user with ID :liked
   *
   * @param {number} riderId - the rider making the request
   * @param {number} driverId - the driver to affect
   * @returns {Observable<string[]>} - Does not actually return anything
   */
  unDislikeDriver(riderId: number, driverId: number): Observable<string[]> {
    return this.http.delete<Link<User>[]>(environment.apiUrl + `/matches/dislikes/${riderId}/${driverId}`);
  }
}
