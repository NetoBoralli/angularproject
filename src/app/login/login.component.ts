import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';
import { LoginService } from './shared/login.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	// items: any;
	// subscribe1: Subscription;
	form: FormGroup;
	email: string;
	password: string;
	showProgress: boolean = false;
	hintLabelEmail: string = null;
	hintLabelPassword: string = null;

	constructor(
		private router: Router,
		private translate: TranslateService,
		private app: AppComponent,
		private loginService: LoginService
		// private db: AngularFireDatabase
	) {
		// this.subscribe1 =  this.db.list('users').valueChanges().subscribe(data => {
		// 	this.items = data
		// });
	 }

	 ngOnInit() {
		 this.app.refreshSystemLanguage();
		 this.form = new FormGroup({
			 email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
			 password: new FormControl(null, Validators.compose([Validators.required]))
		 })
	 }

	login(){
		if(!this.form.valid) return null;

		this.showProgress = true;
		
		this.loginService.doLogin(this.form.get('email').value, this.form.get('password').value)
		.then( (res) => {
			console.log(res.uid);
            this.showProgress = false;
            localStorage.setItem('currentUser', JSON.stringify({email: res.email, username: res.displayName, uid: res.uid}));
			this.hintLabelPassword = null;
			this.hintLabelEmail = null;
			this.router.navigate(['rooms']);
        }).catch((error)=> {
            this.showProgress = false;
			if(error.code == 'auth/wrong-password')
				this.translate.get('WrongPass').subscribe((val) => this.hintLabelPassword = val);
			
			if(error.code == 'auth/invalid-email' || error.code == 'auth/user-not-found')
				this.translate.get('WrongEmail').subscribe((val) => this.hintLabelEmail = val);
        });
	}


	// ngOnDestroy() {
		// if (this.subscribe1) this.subscribe1.unsubscribe();
	// }

	// login() {
	// 	localStorage.setItem('currentUser', 'you');
	// 	this.router.navigate(['']);
	// }

	changeRoute() {
		this.router.navigate(['login/code']);
	}

	signUp(){
		this.router.navigate(['login/signup']);
	}
};