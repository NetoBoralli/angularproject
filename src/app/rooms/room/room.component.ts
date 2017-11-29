import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from './../shared/rooms.service';
import { MatSidenav } from '@angular/material';

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

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private roomsService: RoomsService
  ) { }

  ngOnInit() {
    this.inscription = this.aroute.params.subscribe( (params: any) =>{
      this.key = params['key'];

      this.roomsService.getRoomByKey(this.key).subscribe( (data)=> {
        this.room = data;
      });

      this.roomsService.getQuestions(this.key).subscribe( (data) => {
        this.questions = data.map(c => ({ key: c.payload.key, ...c.payload.val()}));
      });
    })
  }

  action(){
    this.sidenav.open();
    this.router.navigate(['rooms/'+this.key+'/questions']);
  }

  closeSide() {
    this.sidenav.close();
    this.router.navigate(['rooms/'+this.key]);
  }

  questionDetail(qkey: string){
    this.router.navigate(['rooms/'+this.key+'/question/'+qkey]);
  }

  ngOnDestroy(){
    this.inscription.unsubscribe();
  }
}
