import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Play } from '../models/Play';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ADMIN_PLAY_URL = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getAdminPlays(): Observable<any> {
    return this.httpClient.get(this.ADMIN_PLAY_URL).pipe(catchError(this.handleError));
  }

  public postPlayRequest(play: Play) {
    return this.httpClient.post(this.ADMIN_PLAY_URL, play).pipe(catchError(this.handleError));
  }


}
