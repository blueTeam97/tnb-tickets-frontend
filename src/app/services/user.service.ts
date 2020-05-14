import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Play } from '../models/Play';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../models/Ticket';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userGetAllPlaysURL = 'http://localhost:8081/v1/findAll';
  private getAllTicketsByUserIdURL = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) { }

  getAllPlays(): Observable<Play[]> {
    return this.http
      .get<Play[]>(this.userGetAllPlaysURL)
      .pipe(catchError(this.handleError));
  }

  getAllTicketsByUserId(id: number): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(this.getAllTicketsByUserIdURL + '/user/' + id + '/history')
      .pipe(catchError(this.handleError));
  }

  bookTicket(playId: number, userId: number) {
    return this.http
      .get(this.getAllTicketsByUserIdURL + '/play' + playId + '/book' + userId)
      .pipe(catchError(this.handleError));
  }

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
}
