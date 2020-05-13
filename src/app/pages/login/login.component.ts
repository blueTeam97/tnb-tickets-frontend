import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../../services/custom-validation.service'
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/models/auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private loginInfo: AuthLoginInfo;
  error: string;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.checkLoggedIn();
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator("password")])],
      error: ['']
    }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.error = '';
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loginInfo = new AuthLoginInfo(
        this.registerForm.get('email').value,
        this.registerForm.get('password').value
      );
      console.log(this.loginInfo)
      this.attemptAuth(this.loginInfo);
    }
  }

  attemptAuth(loginInfo: AuthLoginInfo) {
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.checkLoggedIn();
      },
      error => {
        this.error = error.error;
        console.log(this.registerForm.get('error').value);
      });
  }

  checkLoggedIn() {
    let roles = [];
    if (this.tokenStorage.getToken()) {
      roles = this.tokenStorage.getAuthorities();
      roles.every(role => {
        if (role === 'user') {
          this.router.navigate(['user'])
        }
        else if (role === 'admin') {
          this.router.navigate(['admin'])
        }
      });
    }
  }

}


