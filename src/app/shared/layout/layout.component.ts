import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DialogsService } from '../services/dialog/dialog.service';
import { RoomListComponent } from '../../rooms/room-list/room-list.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

	isAnonymous: boolean;
	u = JSON.parse(localStorage.getItem('currentUser'));

	constructor(
		private router: Router,
		private dialogService: DialogsService,
		public translate: TranslateService,
		private firebaseAuth: AngularFireAuth
	) { }

	ngOnInit() {
		this.firebaseAuth.auth.onAuthStateChanged(user => {
			if (user) {
				this.isAnonymous = user.isAnonymous;
			}
		});

	}

	logoff() {
		if (this.isAnonymous) {
			this.firebaseAuth.auth.currentUser.delete()
				.then(res => {
					let lang = localStorage.getItem('preferedLang');
					localStorage.clear();
					localStorage.setItem('preferedLang', lang);
					this.router.navigate(['login']);
				})
				.catch(err => console.log(err));
		} else {
			this.firebaseAuth.auth.signOut()
				.then(res => {
					let lang = localStorage.getItem('preferedLang');
					localStorage.clear();
					localStorage.setItem('preferedLang', lang);
					this.router.navigate(['login']);
				})
				.catch(err => console.log(err));
		}
	}

	openDialog() {
		this.dialogService.confirm('ConfirmDialog', 'SelectAnOptionAndOpendTheConsole', 'Ok', 'Cancel').subscribe((res) => {
			if (res == undefined) {
				console.log('Você clicou em Cancelar');
			} else {
				console.log('Você clicou em Ok');
			}
		});
	}

	viewRooms() {
		this.router.navigate(['rooms']);
	}

	changeLanguage(lang) {
		this.translate.use(lang).subscribe((res) => {
			localStorage.setItem('preferedLang', this.translate.currentLang);
		});
	}
}
