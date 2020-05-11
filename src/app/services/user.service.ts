import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private userPlaysUrl = 'http://localhost:8081/all';
 
  constructor(private http: HttpClient) { }
 
  getUserPlays(): Observable<any> {
    return this.http.get(this.userPlaysUrl);
  }
 
}
