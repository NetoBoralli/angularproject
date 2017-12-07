import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from '../shared/rooms.service';
import { KeyService } from './../../shared/services/helpers/key.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AngularFireAuth } from 'angularfire2/auth';
import { LayoutComponent } from './../../shared/layout/layout.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit{

  @ViewChild('sidenav') sidenav: MatSidenav;
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
    private layoutComponent: LayoutComponent
  ) { }

  ngOnInit() {
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

  // bton() {
  //   this.sidenav.toggle();
  // }

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
}
