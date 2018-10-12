import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

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

  /**
   * Basic set up of the Service - it uses no dependency injection
   */
  constructor() { }

  /**
   * Retrieves an S3 bucket object so we can upload files to an actual S3 bucket on Amazon
   * @returns {S3} - the S3 representation to utillize
   */
  getS3Bucket(): any {
    const bucket = new S3 (
    {
    accessKeyId: 'AKIAIRZG4TK6EBLZV7GA',
    secretAccessKey: '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',
    region: 'us-east-1'
    }
    );
    return bucket;
  }

  /**
   * Attempts to actually upload a file to the S3 Service
   * @param file - the file to upload to the S3 service
   * @returns {string} - the url used for the file
   */
  uploadfile(file) {
   const params = {
      Bucket: 'rydeforce',
      Key: this.FOLDER + Math.floor(Math.random() * 100000000000) + file.name ,
      Body: file
       // allow that and instead assign numbers on the beginning of the name.
    };

    const upResult = this.getS3Bucket().upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      console.log(params);

      return true;
    });
    if (!upResult.failed) {
      console.log('upload successful');
      this.url = 'https://s3.us-east-1.amazonaws.com/' + params.Bucket + '/' + params.Key;
    } else {
      console.log('upload failed');
    }

    console.log('BEFORE RETURNING, this.url is: ' + this.url);
    return this.url;
  }
}
