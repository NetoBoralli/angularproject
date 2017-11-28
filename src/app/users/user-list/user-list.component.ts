import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { DialogsService } from '../../shared/services/dialog/dialog.service';
import { UsersService } from '../shared/users.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
	colRef;
	items;
	form: FormGroup;
	// users: any[] = [];
	// subscribe1: Subscription;

	constructor(
		private usersService: UsersService,
		private dialogService: DialogsService,
		private db: AngularFireDatabase,
		private router: Router
	) { }

	ngOnInit() {
		// this.fillUsers();
		this.usersService.getItens().subscribe(changes => {
			this.items = changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
		});
		this.form = new FormGroup({
			name: new FormControl(null)
		})
	}

	ngOnDestroy() {
		// if (this.subscribe1) this.subscribe1.unsubscribe();
	}

	insertBoneco(){
		let owner = JSON.parse(localStorage.getItem('currentUser'));
		this.usersService.setItens(this.form.get('name').value, owner.username).then( data => {
			console.log(data);
			// this.router.navigate(['/users']);
		})
	}

	// getUserData(username: string) {
	// 	this.subscribe1 = this.usersService.get(username).subscribe((data) => {
	// 		this.users.push(data);
	// 	}, (err) => {
	// 		console.log('Ocorreu um erro na sua solicitação');
	// 	});
	// }

	// addUser() {
	// 	this.dialogService.openUserDialog().subscribe((res) => {
	// 		if (res) {
	// 			this.getUserData(res.username);
	// 		}
	// 	});
	// }

	// fillUsers() {
	// 	this.getUserData('mvmjacobs');
	// 	this.getUserData('chpsousa');
	// 	this.getUserData('engelgabriel');
	// 	this.getUserData('young');
	// }
}
