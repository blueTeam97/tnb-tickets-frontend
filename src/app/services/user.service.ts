import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../models/Ticket';
import UserPlaysPopulator from '../models/UserPlaysPopulator';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userGetAllPlaysURL = 'http://localhost:8081/v1/user/findPlays';
  private getAllTicketsByUserIdURL = 'http://localhost:8081/tasks';
  private changeUserSubscribeURL='http://localhost:8081/tasks/user/changeSubscribe'
  private getUserSubscribeStatusURL='http://localhost:8081/tasks/user/getSubscribeStatus';
  private userUnbookTicketURL='http://localhost:8081/tasks/user/ticket/'

  constructor(private http: HttpClient) { }

  getAllPlays(): Observable<UserPlaysPopulator> {
    return this.http
      .get<UserPlaysPopulator>(this.userGetAllPlaysURL)
      .pipe(catchError(this.handleError));
  }

  getAllTicketsByUserId(id: number): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(this.getAllTicketsByUserIdURL + '/user/history')
      .pipe(catchError(this.handleError));
  }
  getSubscribeStatus():Observable<Boolean>{
      return this.http.get<Boolean>(this.getUserSubscribeStatusURL);
 }
  bookTicket(playId: number) {
    return this.http
      .post(this.getAllTicketsByUserIdURL + '/play/' + playId.toString() + '/book',{})
      .pipe(catchError(this.handleError));
  }
  changeSubscribe(){
    return this.http.put(this.changeUserSubscribeURL,{})
               .pipe(catchError(this.handleError))
  }
  unbookTicket(playId:number){
    return this.http.put(this.userUnbookTicketURL+playId+"/unbook",{})
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
