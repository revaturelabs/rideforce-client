import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  selectedFile: File = null;
  imageUploadProgress: string = '0%';

  constructor(private uploadService: UploadService) { }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
    
    // console.log("imageInput.files[0]  " + JSON.stringify(imageInput.files[0]));
    // const file: File = imageInput.files[0];
    // console.log("file to upload: " + file)
    // const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    //   this.uploadService.uploadfile(this.selectedFile.file).subscribe(
    //     res => {
    //       console.log("response: " + JSON.stringify(res))
    //     },
    //     err => {
    //       console.log('err: ' + err)
    //     })
    //   })
    //   reader.readAsDataURL(file);
      
    }
    onFileUpload() {
      const fd = new FormData();
      const fileName = `user-${sessionStorage.getItem('id')}${this.selectedFile.name.substr(this.selectedFile.name.length - 4)}`;
      console.log("FILENAME    ------ " + fileName);
      fd.append('file', this.selectedFile, fileName);
      fd.append('user', sessionStorage.getItem('id'));

      this.uploadService.uploadfile(fd).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.imageUploadProgress = Math.round(event.loaded / event.total) * 100 + '%';
            console.log('Upload Progress: ',this.imageUploadProgress)
          } 
        },
          err => {
          console.log(err);
        });
    }
  }

