import { QuestionDetailComponent } from './rooms/question-detail/question-detail.component';
import { RoomComponent } from './rooms/room/room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { LoginCodeComponent } from './login/login-code/login-code.component';
import { LoginSignupComponent } from './login/login-signup/login-signup.component';
import { UserListComponent } from './users/user-list/user-list.component';

import { LoginAuthGuard } from './shared/services/auth/auth-login.guard';
import { AppAuthGuard } from './shared/services/auth/auth-app.guard';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { QuestionComponent } from './rooms/question/question.component';

const appRoutes: Routes = [
	{ path: 'login', canActivate: [LoginAuthGuard] , children: [
		{ path: '', component: LoginComponent},
		{ path: 'code', component: LoginCodeComponent},
		{ path: 'signup', component: LoginSignupComponent}
	]},
	{ path: '', component: LayoutComponent, canActivate: [AppAuthGuard], children: [
		{ path: 'rooms', component: RoomListComponent, children: [
			{ path: ':key', component: RoomComponent, children: [
				{ path: 'questions', component: QuestionComponent},
				{ path: 'questions/:qkey', component: QuestionComponent}
			]}
		]}
	] },

	// page not found redirect to initial page
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
	exports: [RouterModule]
})
export class AppRouting { }
