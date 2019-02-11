import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File = null;
  imageUploadProgress: string = '0';
  principal: Login;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.principal.subscribe(user => {
      this.principal = user;
      console.log(this.principal);
    });
  }

  ngOnInit(): void {
    bsCustomFileInput.init();
  }

  onFileSelect(event) {
    this.imageUploadProgress = '0%';
    document.getElementById('UploadStats').innerHTML = '';
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    }

    onFileUpload() {
      const fd = new FormData();
      const fileName = `user-${this.principal.id}${this.selectedFile.name.substr(this.selectedFile.name.length - 4)}`;
      console.log("FILENAME    ------ " + fileName);
      fd.append('file', this.selectedFile, fileName);
      fd.append('user', this.principal.id.toString());

      const req = new HttpRequest('POST', environment.userUrl + '/storage/uploadFile', fd, { reportProgress: true });

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.imageUploadProgress = Math.round((100 * event.loaded) / event.total) + '%';
            console.log('Upload Progress: ', this.imageUploadProgress);
        } else if (event.type === HttpEventType.Response) {
          // File uploaded
          document.getElementById('UploadStats').innerHTML = 'Upload Complete!';
        }
      });
  }
}

