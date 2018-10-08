import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../app/models/user.model';
import { Register } from '../../../app/models/register.model';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Office } from '../../models/office.model';
import { Car } from '../../models/car.model';
import { Link } from '../../models/link.model';
import { ContactInfo } from '../../models/contact-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  constructor(private http: HttpClient) { }

  // to be used with the url provided by back end
  private url = '';

  isLoggedIn: boolean;
  currentUser?: User;
  private users: User[] = [];

  private offices: Office[] = [];

  currentUserSubject = new Subject<User>();


  // CRUD FOR USERS * * * * * * * * * * * * * * * * * * * * *

  /**
   * Creates a new user with the given data and password.
   *
   * @param email the user data object
   * @param password the new user's password
   */
  // CREATE
  createUser(user: User, password: string, registrationKey: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users',
      { user, password, registrationKey }
    );
  }

  /**Gets an array of users via the given endpoint */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/users');
  }
  /**Gets a single user via the given endpoint and id */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/users/${id}`);
  }
  /**Gets a single user via the given endpoint and email */
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users', {
      params: { email },
    });
  }

  /* getUsersByOfficeAndRole(office: number, role: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users', {
      params: { office: String(office), role },
    });
  }
 */
  /**
   * Gets the currently logged-in user.
   */
  getCurrentUser(): Observable<User> {
    // We cache the current user in a local variable to prevent making too many
    // calls to the database.
    console.log('Getting current User! api is "' + environment.apiUrl + '/login"');

    return this.currentUser
      ? of(this.currentUser)
      : this.http
        .get<User>(environment.apiUrl + '/login')
        .pipe(
          catchError(function<T>(res?: T) {
            this.currentUser = null;
            return of(res as T);
          }),
          tap(user => {
          this.currentUser = user;
          this.currentUserSubject.next(user);
        }));
  }
  /**First checks that there is not a user populated in currentUser.
   * If there isn't, the currentUser is obtained through the
   * getCurrentUser() function.
   */
  getCurrentUserObservable(): Observable<User> {
    if (!this.currentUser) {
      this.getCurrentUser().subscribe();
    }
    return this.currentUserSubject;
  }

  /**
   * generate a key for trainers/managers to register users
   */
  getRegistrationKey(){
    return this.http.get<string>(environment.apiUrl + `/registration-key`);
  }

  // UPDATE
  /**
    * Updates the given user.
    *
    * @param user the user to update. The ID property is required, to identify
    * the user to update.
    */
  update(user: User): Observable<User> {
    return this.http
      .put<User>(environment.apiUrl + `/users/${user.id}`, user)
      .pipe(
        tap(updated => {
          // We need to make sure that we refresh the current user if that's the
          // one that was updated.
          if (this.currentUser && this.currentUser.id === updated.id) {
            this.currentUser = updated;
          }
        })
      );
  }

  /**
   * Updates the password of the user with the given ID.
   *
   * @param id the ID of the user whose password to update
   * @param oldPassword the user's current password, for verification
   * @param newPassword the desired new password
   */
  updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Observable<void> {
    return this.http.post<void>(environment.apiUrl + `/users/${id}/password`, {
      oldPassword,
      newPassword,
    });
  }

  // DELETE

  // TODO be able to remove
  // removeUser(user: User): Observable<User> {
  //   return this.http
  //     .delete<User>(environment.apiUrl + `/users/${user.id}`);
  // }
  // removeBatch(users: User[]): Observable<User> {
  //   return this.http.delete<User>(environment.apiUrl + `/users/`)
  // }

  /**
   * Invalidates the cached data for the current user, forcing the next call to
   * getCurrentUser to contact the server for new data.
   */
  invalidateCurrentUser(): void {
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }


  // OFFICE CRUD * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  /**Creates a new office using a post method. */
  createOffice(newOffice: Office): Observable<Office> {
    return this.http.post<Office>(environment.apiUrl + '/offices', newOffice);
  }

  // READ
  /**Gets a list of current offices using the given endpoint. */
  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(environment.apiUrl + '/offices');
  }

  // may have to replace string with Link<Office>
  /**Gets, presumably, an office given something.
   * Not sure what. When trying out the endpoint,
   * gave access denied.
   * -Martin
  */
  getOfficeByLink(officeUri: Link<Office>): Observable<Office> {
    return this.http.get<Office>(environment.apiUrl + officeUri);
  }

  // UPDATE
  updateOffice(officeUri: Link<Office>, updatedOffice: Office): Observable<Office> {
    return this.http.put<Office>(environment.apiUrl + officeUri, updatedOffice);
    // maybe implement pipe to verify if the user has authorization to add a location (i.e. a trainer/manager)
  }

  // DELETE
  // TODO


  // CARS CRUD * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  // CREATE
  createCar(newCar: Car): Observable<Car> {
    console.log('Creating new Car! ' + environment.apiUrl);
    return this.http.post<Car>(environment.apiUrl + '/cars', newCar);
  }

  // READ
  getAllCars(): Observable<Car[]> {
    console.log('Getting all cars!');
    return this.http.get<Car[]>(environment.apiUrl + '/cars');
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(environment.apiUrl + `/cars/${id}`);
  }

  // UPDATE
  updateCar(carUri: Link<Car>, newCar: Car): Observable<Car> {
    return this.http
      .put<Car>(environment.apiUrl + carUri, newCar);
  }

  // TODO
  // DELETE CAR

  // CONTACT-INFO CRUD * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  // CREATE
  createContactInfo(newContactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(environment.apiUrl + '/contact-info', newContactInfo);
  }

  // READ
  getAllContactInfo(): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>(environment.apiUrl + '/contact-info');
  }

  getContactInfoById(id: number): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(environment.apiUrl + `/contact-info/${id}`);
  }

  // UPDATE
  updateContactInfo(contactInfoUri: Link<ContactInfo>, newContactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http
      .put<ContactInfo>(environment.apiUrl + contactInfoUri, newContactInfo);
  }

  // TODO
  // DELETE CONTACT-INFO


}
