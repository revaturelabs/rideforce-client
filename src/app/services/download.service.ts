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

  downloadFile(id:String):Observable<FormData>{
    return this.http.get(environment.apiUrl + '/storage/getFile',id,{withCredentials: true}).pipe(map(
      resp=>{        
        const f:File = resp as File;
        return f;
      }
    ))
  }
}
