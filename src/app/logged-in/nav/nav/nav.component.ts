import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

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

  faSignOutAlt = faSignOutAlt;
  toastrActive:Boolean=false;
  
  constructor(private router:Router,
              private tokenStorage:TokenStorageService,
              private userService:UserService,
              private toastr: ToastrService) { 
    if (this.tokenStorage.getToken()) {
      this.email = this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
    }
  
  }
  toastrDisplayStatus(){
    if(this.subscriberCurrentState==="Subscribe"){
      this.toastr.success("You successfully subscribed!");
    }
    else this.toastr.success("You successfully unsubscribed!");
  }
  ngOnInit(): void {
    this.username = this.email.split("@")[0];
    this.userService.getSubscribeStatus().subscribe((res)=>{
      console.log("Response: "+res);
      console.log("Status: "+this.subscriberCurrentState);
      const subscribeValue=res;
      if(subscribeValue){
        this.subscriberCurrentState="Unsubscribe";
      }
      else this.subscriberCurrentState="Subscribe";
    })
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
      this.toastrDisplayStatus();
    });
  }
}
