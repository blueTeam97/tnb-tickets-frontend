import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Play } from '../models/Play';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ADMIN_POST_PLAY_URL = "http://localhost:8081/v1/add";
  private ADMIN_GET_PLAYS_URL = "http://localhost:8081/v1/findAll";
  private ADMIN_DELETE_EDIT_PLAY_URL = "http://localhost:8081/v1/play/";




  constructor(private httpClient: HttpClient) { }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  public getPlaysRequest(): Observable<Play[]> {
    return this.httpClient.get<Play[]>(this.ADMIN_GET_PLAYS_URL);
  }

  public postPlayRequest(play: Play) {
    return this.httpClient.post(this.ADMIN_POST_PLAY_URL, play);
  }

  public deletePlayRequest(id: string) {
    return this.httpClient.delete(this.ADMIN_DELETE_EDIT_PLAY_URL + id);
  }

  public editPlayRequest(play: Play) {
    return this.httpClient.put(this.ADMIN_DELETE_EDIT_PLAY_URL + play.id, play);
  }


}
