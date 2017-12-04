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
  roomsOn: Array<any>;
  form: FormGroup;
  codes;
  user = JSON.parse(localStorage.getItem('currentUser'));
  array: Array<any>;

  constructor(
    private roomService: RoomsService,
    private router: Router,
    private keyService: KeyService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.roomService.getRoomsByOwner(this.user.username).subscribe(changes => {
      this.rooms = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.roomService.getCodes().subscribe(data => {
      this.codes = data;
    })

    // this.roomService.getRoomAssociate(this.user.uid).subscribe(data => {
    //   this.array = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //   this.arrangeRoom(this.array[0].keys);
    // })
    this.arrangeRoom();

    this.form = new FormGroup({
      name: new FormControl(null)
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

  goRoom(key: string) {
    this.router.navigate(['rooms/', key]);
  }

}
