import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import * as S3 from 'aws-sdk/clients/s3';

/**
 * Enables components to upload files (cheifly images) to the dedicated S3 Bucket on Amazon Web Services
 */
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  /**
   * Basic set up of the Service - it uses no dependency injection
   */
  constructor(private http: HttpClient) { }

  /**
   * Attempts to actually upload a file to the S3 Service
   * @param file - the file to upload to the S3 service
   * @returns {string} - the url used for the file
   */

}
