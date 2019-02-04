import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(id:String):Observable<Blob>{
    return this.http.get(environment.apiUrl + '/storage/getFile/'+id,{ responseType: 'blob' }).pipe(map(
      resp=>{        
        const b:Blob = resp as Blob;
        return b;
      }
    ))
  }
}
