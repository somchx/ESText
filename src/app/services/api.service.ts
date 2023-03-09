import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000/'
  constructor(private http: HttpClient) { }
  upload(file: any): Observable<Process> {
    const body = new FormData()
    body.append("", file)
    return this.http.post<Process>(this.baseUrl + "/upload", body).pipe(catchError(this.errorHandler));
  }
  getProcess(): Observable<Result> {
    return this.http.get<Result>(this.baseUrl + "/upload/getprocess")
  }
  getAgain():Observable<Result>{
    return this.http.get<Result>(this.baseUrl + "/clear")
  }
  getVideo():Observable<Blob>{
    const headers = new HttpHeaders({
      // 'Access-Control-Allow-Headers':'Content-Type',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Cache-Control':'no-cache',
      'Pragma' :'no-cache',
    })
    return this.http.get(this.baseUrl + '/video', {responseType: 'blob',headers:headers});
  }
  getTime():Observable<Result>{
    return this.http.get<Result>(this.baseUrl + "/duration")
  }
  postMail(email: any): Observable<Process> {
    const body = new FormData()
    body.append("", email)
    return this.http.post<Process>(this.baseUrl + "/mail", email);
  }
  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
export interface Process {
  status(response: Process, status: any): unknown;
  type: string
  name: string
  directory: string
  size: number
  time : number
}
export interface Result{
  class: any
  filename : string
  transcription : SpeechRecTranscription
  script : string
  start_time : any
  end_time : number
  time: any
}
export interface SpeechRecTranscription{
  data : SpeechRecData
  status : string
}
export interface SpeechRecData{
  results : SpeechRecResult[]
  version : string
}
export interface SpeechRecResult{
  duration : number
  filename : string
  predictions : Prediction[]
}
export interface Prediction{
  end_time : number
  start_time : number
  transcript : string
}
function express() {
  throw new Error('Function not implemented.');
}

