import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from '../shared/rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {  
  
  rooms;
  form: FormGroup;
  
  constructor(
    private roomService:RoomsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomService.getRooms().subscribe(changes => {
			this.rooms = changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
    this.form = new FormGroup({
			name: new FormControl(null)
		});
  }

  insertRoom(){
		let owner = JSON.parse(localStorage.getItem('currentUser'));
		this.roomService.setRooms(this.form.get('name').value, owner.username).then( data => {
			this.form.reset();
		})
  }
  
  goRoom(key:string){
    this.router.navigate(['rooms/', key]);
  }

}
