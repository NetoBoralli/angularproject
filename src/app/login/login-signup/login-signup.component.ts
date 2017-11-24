import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LoginService } from './../shared/login.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  form: FormGroup;
  email: string;
  password: string;
  showProgress: boolean = false;
  hintLabelEmail: string = null;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      username: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required])),
      confirmPassword: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  signUp() {
    if (!this.form.valid) return null;

    this.showProgress = true;

    this.loginService.doSignUp(this.form.get('email').value, this.form.get('password').value)
      .then((res) => {
        this.loginService.doUpdateOnSignUp(this.form.get('username').value)
          .then((res) => {
            localStorage.setItem('currentUser', JSON.stringify({email: this.form.get('email').value, username: this.form.get('username').value}));
            this.hintLabelEmail = null;
            this.router.navigate(['/users']);
          })
          .catch((err) => {
            console.log(err.code);
            this.showProgress = false;
          });
      })
      .catch((err) => {
        this.showProgress = false;
        console.log(err.code);
        if(err.code == 'auth/email-already-in-use')
          this.translate.get('ExistentEmail').subscribe((val) => this.hintLabelEmail = val);
      });
  }

}
