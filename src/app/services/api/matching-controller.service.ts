import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../../../app/models/user.model";
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../../models/link.model';

@Injectable()
export class MatchingControllerService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all drivers who match the rider with the given user ID.
   * 
   * @param riderId 
   */
  getMatchingDrivers(riderId: number): Observable<Link<User>[]> {
    return this.http.get<Link<User>[]>(environment.apiUrl + `/matches/${riderId}`);
  }

  /**
   * Returns all users liked by the user with the given ID.
   * 
   * @param riderId 
   */
  getLikedDrivers(riderId: number): Observable<Link<User>[]> {
    return this.http.get<Link<User>[]>(environment.apiUrl + `/likes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id likes the user with ID :liked.
   * 
   * @param riderId 
   * @param driverId 
   */
  likeDriver(riderId: string, driverId: string): void {
    this.http.put<Link<User>[]>(environment.apiUrl + `/likes/${riderId}/${driverId}`, '');
  }

  /**
   * Removes any indication that the user with ID :id likes the user with ID :liked
   * 
   * @param riderId 
   * @param driverId 
   */
  unlikeDriver(riderId: string, driverId: string): void {
    this.http.delete<Link<User>[]>(environment.apiUrl + `/likes/${riderId}/${driverId}`);
  }

  /**
   * Returns all users disliked by the user with the given ID
   * @param riderId 
   */
  getDislikedDrivers(riderId: number): Observable<Link<User>[]> {
    return this.http.get<Link<User>[]>(environment.apiUrl + `/dislikes/${riderId}`);
  }

  /**
   * Indicates that the user with ID :id unliked the user with ID :liked.
   * 
   * @param riderId 
   * @param driverId 
   */
  dislikeDriver(riderId: string, driverId: string): void {
    this.http.put<Link<User>[]>(environment.apiUrl + `/dislikes/${riderId}/${driverId}`, '');
  }

  /**
   *  Removes any indication that the user with ID :id disliked the user with ID :liked
   * 
   * @param riderId 
   * @param driverId 
   */
  unDislikeDriver(riderId: string, driverId: string): void {
    this.http.delete<Link<User>[]>(environment.apiUrl + `/dislikes/${riderId}/${driverId}`);
  }
}
