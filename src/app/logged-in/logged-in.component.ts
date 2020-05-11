import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit {

  constructor(private router:Router,private tokenStorage:TokenStorageService) { 
    let roles = [];
    if (this.tokenStorage.getToken()) {
      roles = this.tokenStorage.getAuthorities();
      roles.every(role => {
        if (role === 'user') {
          this.router.navigate(['user'])
        }
        else if(role === 'admin'){
          this.router.navigate(['admin'])
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
