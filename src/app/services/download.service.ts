import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http: HttpClient) { }
  download(url: string): Observable<Blob> {
      const headers = new HttpHeaders({
        'Cache-Control':'no-cache',
        'Pragma' :'no-cache',
      })
    return this.http.get(url,{responseType: 'blob',headers:headers})
  }
}
