import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from '../shared/rooms.service';
import { KeyService } from './../../shared/services/helpers/key.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms;
  roomsPart;
  form: FormGroup;
  codes;
  owner = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private roomService: RoomsService,
    private router: Router,
    private keyService: KeyService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.roomService.getRoomsByOwner(this.owner.username).subscribe(changes => {
      this.rooms = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.roomService.getCodes().subscribe(data => {
      this.codes = data;
    })
    this.form = new FormGroup({
      name: new FormControl(null)
    });
  }

  insertRoom() {
    let code = this.keyService.generateId(6);
    let inserted = false;

    if (!this.verifyCodes(code)) {
      this.roomService.setRooms(this.form.get('name').value, this.owner.username, code).then(data => {
        this.form.reset();
        // this.roomService.setParticipants(data.key, this.owner.username);
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

  goRoom(key: string) {
    // this.roomService.getParticipants(key, this.owner.username).subscribe(data => {
    //   if (data[0] == null) this.roomService.setParticipants(key, this.owner.username);
    //   else console.log("User already in the room");
    // }) 
    this.router.navigate(['rooms/', key]);
  }

}
