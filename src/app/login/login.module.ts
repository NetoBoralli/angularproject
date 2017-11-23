import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginCodeComponent } from './login-code/login-code.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '../shared/material/material.module';
import { AppRouting } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './shared/login.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
		LoginComponent,
		LoginCodeComponent,
    LoginSignupComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
