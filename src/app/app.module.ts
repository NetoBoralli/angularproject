import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

import { AppRouting } from './app.routing';

import { LoginAuthGuard } from './shared/services/auth/auth-login.guard';
import { HttpInterceptor } from './shared/services/http/http-interceptor.service';
import { LoginCodeComponent } from './login/login-code/login-code.component';
import { LoginSignupComponent } from './login/login-signup/login-signup.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RoomsModule } from './rooms/rooms.module';
import { KeyService } from './shared/services/helpers/key.service';

export function HttpInterceptorFactory(backend: XHRBackend, options: RequestOptions, router: Router, injector: Injector) {
	return new HttpInterceptor(backend, options, router, injector);
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpModule,
		HttpClientModule,
		AppRouting,
		SharedModule,
		UsersModule,
		FormsModule,
		FlexLayoutModule,
		LoginModule,
		RoomsModule,
		AngularFireModule.initializeApp(environment.firebase),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	declarations: [
		AppComponent
	],
	providers: [
		{ provide: Http, useFactory: HttpInterceptorFactory, deps: [XHRBackend, RequestOptions, Router, Injector] },
		KeyService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
