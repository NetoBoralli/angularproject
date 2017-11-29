import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from '../shared/rooms.service';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  
  inscription: Subscription
  form: FormGroup
  key: string;

  constructor(
    private roomsService: RoomsService,
    private aroute: ActivatedRoute,
    private roomComponent: RoomComponent
  ) { }

  ngOnInit() {
    this.inscription = this.aroute.params.subscribe((params: any) => {
      this.key = this.roomComponent.key;
    });

    this.form = new FormGroup({
      question: new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.roomComponent.sidenav.close();
  }

  insertQuestion() {
    let owner = JSON.parse(localStorage.getItem('currentUser'));
    this.roomsService.setQuestion(this.key, this.form.get('question').value, owner.username).then(data => {
      console.log(data);
    })
    this.form.reset();
  }
}
