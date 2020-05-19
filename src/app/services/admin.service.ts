import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Play } from '../models/Play';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ADMIN_POST_PLAY_URL = "http://localhost:8081/v1/add";
  private ADMIN_GET_PLAYS_URL = "http://localhost:8081/v1/findAll";
  private ADMIN_DELETE_EDIT_PLAY_URL = "http://localhost:8081/v1/play/";
  private ADMIN_GET_TICKETS_BY_ID_URL = "http://localhost:8081/tasks/findTicketsByPlayId/";


  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public getPlaysRequest(): Observable<Play[]> {
    return this.httpClient.get<Play[]>(this.ADMIN_GET_PLAYS_URL)
      .pipe(catchError(this.handleError));
  }

  public postPlayRequest(play: Play) {
    return this.httpClient.post(this.ADMIN_POST_PLAY_URL, play)
      .pipe(catchError(this.handleError));
  }

  public deletePlayRequest(id: number) {
    return this.httpClient.delete(this.ADMIN_DELETE_EDIT_PLAY_URL + id)
      .pipe(catchError(this.handleError));
  }

  public editPlayRequest(play: Play) {
    return this.httpClient.put(this.ADMIN_DELETE_EDIT_PLAY_URL + play.id, play)
      .pipe(catchError(this.handleError));
  }

  public getTicketsbyPlayIdRequest(id: number) {
    return this.httpClient.get(this.ADMIN_GET_TICKETS_BY_ID_URL + id)
      .pipe(catchError(this.handleError));
  }


}
