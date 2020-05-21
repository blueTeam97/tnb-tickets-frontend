import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  email: string;
  username: string;
  subscriberCurrentState:string="Unsubscribe";
  roles = [];
  
  constructor(private router:Router,private tokenStorage:TokenStorageService,private userService:UserService) { 
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
  ChangeSubscriber(){
    console.log("Subscribe changed");
    this.userService.changeSubscribe().subscribe((res)=>{
      if(res==0){
        this.subscriberCurrentState="Unsubscribe";
      }
      else if(res==1){
        this.subscriberCurrentState="Subscribe";
      }
    });
  }
}
