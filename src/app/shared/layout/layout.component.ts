import { KeyService } from './../services/helpers/key.service';
import { RoomsService } from './../../rooms/shared/rooms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DialogsService } from '../services/dialog/dialog.service';
import { RoomListComponent } from '../../rooms/room-list/room-list.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { window } from 'rxjs/operator/window';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

	@ViewChild('side') side: MatSidenav;
	isAnonymous: boolean;
	rooms;
	roomsOn: Array<any>;
	form: FormGroup;
	codes;
	user = JSON.parse(localStorage.getItem('currentUser'));
	array: Array<any>;

	constructor(
		private router: Router,
		private dialogService: DialogsService,
		public translate: TranslateService,
		private firebaseAuth: AngularFireAuth,
		private roomService: RoomsService,
		private keyService: KeyService
	) { }

	ngOnInit() {
		this.firebaseAuth.auth.onAuthStateChanged(user => {
			if (user) {
				this.isAnonymous = user.isAnonymous;
			}
		});

		this.roomService.getRoomsByOwner(this.user.username).subscribe(changes => {
			this.rooms = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
		});

		this.roomService.getCodes().subscribe(data => {
			this.codes = data;
		})

		this.arrangeRoom();

		this.form = new FormGroup({
			name: new FormControl(null)
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

	// openDialog() {
	// 	this.dialogService.confirm('ConfirmDialog', 'SelectAnOptionAndOpendTheConsole', 'Ok', 'Cancel').subscribe((res) => {
	// 		if (res == undefined) {
	// 			console.log('Você clicou em Cancelar');
	// 		} else {
	// 			console.log('Você clicou em Ok');
	// 		}
	// 	});
	// }

	viewRooms() {
		this.side.toggle();
	}

	changeLanguage(lang) {
		this.translate.use(lang).subscribe((res) => {
			localStorage.setItem('preferedLang', this.translate.currentLang);
		});
	}

	arrangeRoom() {
		this.roomService.getRoomAssociate(this.user.uid).subscribe(data => {
			this.array = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
			let keys = this.array[0].keys;
			this.roomService.getRooms().subscribe(data => {
				let x = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
				this.roomsOn = x.filter(d => keys.includes(d.key) && d.owner != this.user.username);
			});
		})
	}

	insertRoom() {
		if (!this.form.get('name').value) return null;

		let code = this.keyService.generateId(6);
		let inserted = false;

		if (!this.verifyCodes(code)) {
			this.roomService.setRooms(this.form.get('name').value, this.user.username, code).then(data => {
				this.form.reset();
				this.roomService.setCode(code);
			})
		}
		else {
			this.insertRoom();
		}
	}

	verifyCodes(code) {
		return this.codes.findIndex(c => c.code == code) >= 0;
	}

	closeMobile() {
		let x = document.documentElement;
		if (x.clientWidth < 900)
			this.side.close();
	}
}
