import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from './../shared/rooms.service';
import { MatSidenav } from '@angular/material';
import { RoomListComponent } from '../room-list/room-list.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;
  inscription: Subscription;
  key;
  room: any = {};
  questions;
  user = JSON.parse(localStorage.getItem('currentUser'));
  arrayK: Array<any> = [];
  keys = [];
  owner: boolean = false;

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private roomsService: RoomsService,
    private roomList: RoomListComponent
  ) { }

  ngOnInit() {
    this.inscription = this.aroute.params.subscribe((params: any) => {
      this.key = params['key'];

      this.roomsService.getRoomByKey(this.key).subscribe((data) => {
        this.room = data;
        if(this.room.owner == this.user.username){
          this.owner = true;
        }else {
          this.owner = false;
        }
      });

      this.roomsService.getQuestions(this.key).subscribe((data) => {
        this.questions = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

      this.roomAssociate();
    })
  }


  roomAssociate() {
    this.roomsService.getRoomAssociate(this.user.uid).subscribe(data => {
      this.keys = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      if (!this.keys[0]) {
        //create a rooms
        this.arrayK.push(this.key);
        this.roomsService.setRoomAssociate(this.user.uid, this.arrayK);
      } else {
        //update the room
        if (!this.verifyKeys(this.keys[0].keys, this.key)) {
          this.arrayK.push(this.key);
          this.roomsService.updateRoomAssociate(this.keys[0].key, this.arrayK);
        }
      }
      this.roomList.arrangeRoom();
    })
  }

  verifyKeys(values, key) {
    this.arrayK = values;
    return this.arrayK.findIndex(a => a == key) >= 0;
  }

  action() {
    // this.roomsService.setRoomAssociate(this.user.uid, this.key).then(data => {
    //   console.log('added');
    // });
    // let keys = ['-L-HM9XduheXxJsCrnPy', '-L-HB8cjRePxY8FV0WjV'];
    // let key = '-L-HEk-oJ_3ntNL2H8qj';
    // this.roomsService.updateRoomAssociate(key, keys);
    this.sidenav.open();
    this.router.navigate(['rooms/' + this.key + '/questions']);
  }

  closeSide() {
    this.sidenav.close();
    this.router.navigate(['rooms/' + this.key]);
  }

  questionDetail(qkey: string) {
    this.router.navigate(['rooms/' + this.key + '/question/' + qkey]);
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
  }
}
