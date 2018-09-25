import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  FOLDER = 'petpal-s3/';
  url: any;
  
  constructor() { }

  getS3Bucket(): any {
    const bucket = new S3 (
    {
    accessKeyId: 'AKIAJZ7JSNQQZDUXWI7A',
    secretAccessKey: '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',
    region: 'us-east-2'
    }
    );
    return bucket;
  } 

  uploadfile(file) {
   const params = {
      Bucket: 'petpalpictures',
      Key: this.FOLDER + Math.floor(Math.random() * 10000000000) + file.name ,
      Body: file,
      ACL: 'public-read'
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
    console.log(upResult.failed);
    if (!upResult.failed) {
      console.log('upload successful');
      this.url = 'https://s3.us-east-2.amazonaws.com/' + params.Bucket + ' ' + params.Key;
    } else {
      console.log('upload failed');
    }

    console.log('BEFORE RETURNING, this.url is: ' + this.url);
    return this.url;
  }
} 
