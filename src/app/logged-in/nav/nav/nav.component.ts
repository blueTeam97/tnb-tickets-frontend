import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  email: string;
  username: string;
  roles = [];
  
  constructor(private router:Router,private tokenStorage:TokenStorageService) { 
    if (this.tokenStorage.getToken()) {
      this.email = this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
    }
  
  }

  ngOnInit(): void {
    this.username = this.email.split("@")[0];
  }

  logout(){
    this.tokenStorage.signOut();
    this.router.navigate(['login']);
  }
  
}
