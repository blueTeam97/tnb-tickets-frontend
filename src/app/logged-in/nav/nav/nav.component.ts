import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  username: string;
  roles = [];

  constructor(private router:Router,private tokenStorage:TokenStorageService) { 
    
    if (this.tokenStorage.getToken()) {
      this.username = tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  ngOnInit(): void {
  }

}
