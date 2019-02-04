import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  selectedFile: File = null;
  imageUploadProgress: string = '0';
  fd;
  fileName;

  constructor(public http: HttpClient) { }

  onFileSelect(event) {
    this.imageUploadProgress = '0%';
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
    }
    
    onFileUpload() {
      this.fd = new FormData();
      this.fileName = `user-${sessionStorage.getItem('id')}${this.selectedFile.name.substr(this.selectedFile.name.length - 4)}`;
      console.log("fileName    ------ " + this.fileName)
      this.fd.append('file', this.selectedFile, this.fileName);
      this.fd.append('user', sessionStorage.getItem('id'));
      //this.http.post('http://localhost:2222/storage/uploadFile', this.fd, {
      this.http.post(environment.apiUrl + '/storage/uploadFile', this.fd, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe( event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.imageUploadProgress = Math.round(event.loaded / event.total) * 100 + '%';
            console.log('Upload Progress: ',this.imageUploadProgress)
          } 
        },
        err => {
          console.log(err);
        }
        )
    }
  }

