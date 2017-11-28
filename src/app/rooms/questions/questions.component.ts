import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from '../shared/rooms.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  inscription: Subscription
  form: FormGroup
  key: string;

  constructor(
    private roomsService: RoomsService,
    private aroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      question: new FormControl(null)
    });
  }

  insertQuestion() {
    let owner = JSON.parse(localStorage.getItem('currentUser'));
    this.key = localStorage.getItem('key');
    this.roomsService.setQuestion(this.key, this.form.get('question').value, owner.username).then(data => {
      console.log(data);
    })
    this.form.reset();
  }
}
