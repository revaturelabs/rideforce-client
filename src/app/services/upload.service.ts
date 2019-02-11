import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Login } from '../models/login.model';

// import * as S3 from 'aws-sdk/clients/s3';

/**
 * Enables components to upload files (cheifly images) to the dedicated S3 Bucket on Amazon Web Services
 */
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  /** The Root folder name used by this system */
  FOLDER = 'rydeforce-s3/';
  /** Holds the url where the image will be stored*/
  url: any;
  principal: Login;
  /**
   * Basic set up of the Service - it uses no dependency injection
   */
  constructor(private http: HttpClient, auth: AuthService) {
    auth.principal.subscribe(user => {
      this.principal = user;});
   }

  /**
   * Attempts to actually upload a file to the S3 Service
   * @param file - the file to upload to the S3 service
   * @returns {string} - the url used for the file
   */

  uploadfile(image: File): Observable<Object> {
    const formData = new FormData();
    const fileName = `user-${this.principal.id}${image.name.substr(image.name.length - 4)}`;
    console.log("FILENAME    ------ " + fileName)
    formData.append('image', image, fileName);
    const endpoint = 'http://localhost:2222/storage/uploadFile';
    // const payload = {file: formData};
    // const body = JSON.stringify(payload);
    // console.log("post body: " + JSON.stringify(formData))
    return this.http.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=whatever whatever--'
      }
    });
  }
}
