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

	constructor(
		private router: Router,
		private dialogService: DialogsService,
		public translate: TranslateService
	) { }

	ngOnInit() {
	}

	logoff() {
		localStorage.removeItem('currentUser');
		this.router.navigate(['login']);
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

	changeLanguage() {
		this.translate.use(this.translate.currentLang === 'en' ? 'pt' : 'en').subscribe((res) => {
			localStorage.setItem('preferedLang', this.translate.currentLang);
		});
	}
}
