import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  selectedFile: File = null;
  imageUploadProgress: string = '0';
  principal: Login;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.principal.subscribe(user => {
      this.principal = user;
      console.log(this.principal);
    });
  }

  Oninit() { }

  onFileSelect(event) {
    this.imageUploadProgress = '0%';
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    }

    onFileUpload() {
      const fd = new FormData();
      const fileName = `user-${this.principal.id}${this.selectedFile.name.substr(this.selectedFile.name.length - 4)}`;
      console.log("FILENAME    ------ " + fileName);
      fd.append('file', this.selectedFile, fileName);

      fd.append('user', this.principal.id.toString());

      //this.http.post('http://localhost:2222/storage/uploadFile', fd, {
      this.http.post(environment.userUrl + '/storage/uploadFile', fd, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe( event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.imageUploadProgress = Math.round(event.loaded / event.total) * 100 + '%';
            console.log('Upload Progress: ', this.imageUploadProgress);
            if(this.imageUploadProgress == '100%'){
              document.getElementById("UploadStats").innerHTML = "Upload Complete!";
            }
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}

