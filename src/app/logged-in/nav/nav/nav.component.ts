import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  email: string;
  username: string;
  subscriberCurrentState: string = "Unsubscribe";
  roles = [];

  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  faBellSlash = faBellSlash;

  constructor(private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private toastr: ToastrService) {
    if (this.tokenStorage.getToken()) {
      this.email = this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
    }

  }
  toastrDisplayStatus() {
    const toastOptions = {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
      disableTimeout: true
    };
    if (this.subscriberCurrentState === "Subscribe") {
      this.toastr.success("You successfully unsubscribed!", "", toastOptions);
    }
    else this.toastr.success("You successfully subscribed!", "", toastOptions);
  }
  ngOnInit(): void {
    this.username = this.email.split("@")[0];
    this.userService.getSubscribeStatus().subscribe((res) => {
      console.log("Response: " + res);
      console.log("Status: " + this.subscriberCurrentState);
      const subscribeValue = res;
      if (subscribeValue) {
        this.subscriberCurrentState = "Unsubscribe";
      }
      else this.subscriberCurrentState = "Subscribe";
    })
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['login']);
  }
  ChangeSubscriber() {
    console.log("Subscribe changed");
    this.userService.changeSubscribe().subscribe((res) => {
      if (res == 0) {
        this.subscriberCurrentState = "Subscribe";
      }
      else if (res == 1) {
        this.subscriberCurrentState = "Unsubscribe";
      }
      this.toastrDisplayStatus();
    });
  }
}
