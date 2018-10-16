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
import { Role } from '../../models/role.model';

/**
 * Enables multiple components to work with User services on the back-end
 */
@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  /**
   * Sets up the User Service via the Injection of the HttpClient
   * @param {HttpClient} http - Allows service to communicate with the server via HTTP requests
   */
  constructor(private http: HttpClient) { }

  /** to be used with the url provided by back end */
  private url = '';

  /** Is the user currently logged in? */
  isLoggedIn: boolean;
  /** Who is the current user of the system? */
  currentUser?: User;

  /** Holds a list of users (does not appear to be used) */
  private users: User[] = [];

  /** Holds a list of offices (does not appear to be used) */
  private offices: Office[] = [];

  /** Behaves in a manner similar to that of Observables for Users */
  currentUserSubject = new Subject<User>();


  // CRUD FOR USERS * * * * * * * * * * * * * * * * * * * * *

  /**
   * Creates a new user with the given data and password.
   *
   * @param email the user data object
   * @param password the new user's password
   * @returns {Observable<User>} - the user entered into the system
   */
  // CREATE
  createUser(user: User, password: string, registrationKey: string): Promise<User> {
    return this.http.post<User>(environment.apiUrl + '/users',
      { user, password, registrationKey }
    ).toPromise();
  }

  /**
   * Gets an array of users via the given endpoint
   * @returns {Observable<User[]>} - the list of Users on the system
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/users');
  }
  /** Gets a single user via the given endpoint and id
   * @param {number} id - the id of the user to retrieve
   * @returns {Observable<User>} - the user with the given id
  */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/users/${id}`);
  }
  /**
   * Gets a single user via the given endpoint and email
   * @param {string} email - the email of the user to retrieve
   * @returns {Observable<User>} - the user with the given email
   */
  getUserByEmail(email: string): Promise<User> {
    return this.http.get<User>(environment.apiUrl + '/users', {
      params: { email },
    }).toPromise();
  }

  /* getUsersByOfficeAndRole(office: number, role: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users', {
      params: { office: String(office), role },
    });
  }
 */
  /**
   * Gets the currently logged-in user.
   * @returns {Observable<User>} - the user currently logged in
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
   * @returns {Observable<User>} - the user currently logged in
   */
  getCurrentUserObservable(): Observable<User> {
    if (!this.currentUser) {
      this.getCurrentUser().subscribe();
    }
    return this.currentUserSubject;
  }

  /**
   * generate a key for trainers/managers to register users
   * @returns {Observable<string>} - the key to offer new users to use
   */
  getRegistrationKey() {
    return this.http.get<string>(environment.apiUrl + `/registration-key`);
  }

  // UPDATE
  /**
    * Updates the given user.
    *
    * @param user the user to update. The ID property is required, to identify
    * the user to update.
    * @returns {Observable<User>} - the user being updated
    */
  update(): Promise<User> {
    const body = {
      firstName: sessionStorage.getItem('firstName'),
      lastName: sessionStorage.getItem('lastName'),
      email: sessionStorage.getItem('userEmail'),
      photoUrl: null,
      password: sessionStorage.getItem('userPassword'),
      role: sessionStorage.getItem('role'),
      address: sessionStorage.getItem('address'),
      batchEnd: new Date(sessionStorage.getItem('batchEnd')),
      startTime: null,
      active: sessionStorage.getItem('active')
    };

    return this.http
      .put<User>(environment.apiUrl + `/users/${sessionStorage.getItem('id')}`, body)
      .pipe(
        tap(updated => {
          // We need to make sure that we refresh the current user if that's the
          // one that was updated.
          if (this.currentUser && this.currentUser.id === updated.id) {
            this.currentUser = updated;
          }
        })
      ).toPromise();
  }

  /**
   * Updates the password of the user with the given ID.
   *
   * @param id the ID of the user whose password to update
   * @param oldPassword the user's current password, for verification
   * @param newPassword the desired new password
   * @returns {Observable<void>} - the value returned by the server
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
  /**
   * Creates a new office using a post method.
   * @param {Office} newOffice - the office to add
   * @returns {Observable<Office>} - the office entered into the system
  */
  createOffice(newOffice: Office): Observable<Office> {
    return this.http.post<Office>(environment.apiUrl + '/offices', newOffice);
  }

  // READ
  /**
   * Gets a list of current offices using the given endpoint.
   * @returns {Observable<Office[]>} - Returns all offices entered in the system
   */
  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(environment.apiUrl + '/offices');
  }

  // may have to replace string with Link<Office>
  /**Gets, presumably, an office given something.
   * Not sure what. When trying out the endpoint,
   * gave access denied.
   * @param {Link<Office>} officeUri - the URL mapping to retrieve the office being sought
   * @returns {Observable<Office>} - the office being sought
   * -Martin
  */
  getOfficeByLink(officeUri: Link<Office>): Observable<Office> {
    return this.http.get<Office>(environment.apiUrl + officeUri);
  }

  // UPDATE
  /**
   * Updates an office with new info
   * @param officeUri - the URL mapping of the office to update
   * @param updatedOffice - the new stats related to the target office
   * @returns {Observable<Office>} - the office the system updated
   */
  updateOffice(officeUri: Link<Office>, updatedOffice: Office): Observable<Office> {
    return this.http.put<Office>(environment.apiUrl + officeUri, updatedOffice);
    // maybe implement pipe to verify if the user has authorization to add a location (i.e. a trainer/manager)
  }

  // DELETE
  // TODO


  // CARS CRUD * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  // CREATE
  /**
   * Adds a new car to the database
   * @param {Car} newCar - the car to add to the system
   * @returns {Observable<Car>} - the Data entered into the system
   */
  createCar(newCar: Car): Observable<Car> {
    console.log('Creating new Car! ' + environment.apiUrl);
    return this.http.post<Car>(environment.apiUrl + '/cars', newCar);
  }

  // READ
  /**
   * Retrieves all cars stored by the system
   * @returns {Observable<Car[]>} - the Data returned by the system
   */
  getAllCars(): Observable<Car[]> {
    console.log('Getting all cars!');
    return this.http.get<Car[]>(environment.apiUrl + '/cars');
  }

  /**
   * Retrieves a given car by its id
   * @param {number} id - the id of the car to get
   * @returns {Observable<Car>} - the Data returned by the system
   */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(environment.apiUrl + `/cars/${id}`);
  }

  // UPDATE
  /**
   * Updates Car information with updated information
   * @param {Link<Car>} carUri - The URL mapping to the proper car
   * @param {Car} newCar - the new information to update with
   * @returns {Observable<Car>} - the Data entered into the system
   */
  updateCar(carUri: Link<Car>, newCar: Car): Observable<Car> {
    return this.http
      .put<Car>(environment.apiUrl + carUri, newCar);
  }

  // TODO
  // DELETE CAR

  // CONTACT-INFO CRUD * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  // CREATE
  /**
   * Adds a new contact mechanism to the database
   * @param {ContactInfo} newContactInfo - the Contact data to add to the system
   * @returns {Observable<ContactInfo>} - the Data entered into the system
   */
  createContactInfo(newContactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(environment.apiUrl + '/contact-info', newContactInfo);
  }

  // READ
  /**
   * Retrieves all contact information stored by the system
   * @returns {Observable<ContactInfo[]>} - the Data returned by the system
   */
  getAllContactInfo(): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>(environment.apiUrl + '/contact-info');
  }

  /**
   * Retrieves a given contact info by its id
   * @param {number} id - the id of the info to get
   * @returns {Observable<ContactInfo>} - the Data returned by the system
   */
  getContactInfoById(id: number): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(environment.apiUrl + `/contact-info/${id}`);
  }

  // UPDATE
  /**
   * Updates Contact information with updated information
   * @param {Link<ContactInfo>} contactInfoUri - The URL mapping to the proper Contact info
   * @param {ContactInfo} newContactInfo - the new information to update with
   * @returns {Observable<ContactInfo>} - the Data entered into the system
   */
  updateContactInfo(contactInfoUri: Link<ContactInfo>, newContactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http
      .put<ContactInfo>(environment.apiUrl + contactInfoUri, newContactInfo);
  }

  // TODO
  // DELETE CONTACT-INFO


}
