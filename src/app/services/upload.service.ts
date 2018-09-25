import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  FOLDER = 'rydeforce-s3/';
  url: any;
  
  constructor() { }

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

  uploadfile(file) {
   const params = {
      Bucket: 'rydeforce',
      Key: this.FOLDER + Math.floor(Math.random() * 100000000000) + file.name , //duplicates can be enabled in S3, but we decided to not 
      Body: file                                                                 //allow that and instead assign numbers on the beginning of the name.
    };

    let upResult = this.getS3Bucket().upload(params, function (err, data) {
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
      this.url = 'https://s3.us-east-2.amazonaws.com/' + params.Bucket + '/' + params.Key;
    } else {
      console.log('upload failed');
    }

    console.log('BEFORE RETURNING, this.url is: ' + this.url);
    return this.url;
  }
} 
