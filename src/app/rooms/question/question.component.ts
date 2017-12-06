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
  form: FormGroup;
  answerForm: FormGroup
  key: string;
  qkey: string;
  question: any = {};
  new: boolean = false;
  answers;
  tags: any[] = [];
  // owner: boolean = false;
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private roomsService: RoomsService,
    private aroute: ActivatedRoute,
    public roomComponent: RoomComponent
  ) { }

  ngOnInit() {
    // this.owner = this.user.username == this.roomComponent.room.owner ? true : false;

    this.inscription = this.aroute.params.subscribe((params: any) => {
      this.key = this.roomComponent.key;
      this.qkey = params['qkey'];

      this.roomsService.getQuestionByKey(this.key, this.qkey).subscribe((data) => {
        if (data) {
          this.question = data;
        } else {
          this.new = true;
        }
        this.roomsService.getAnswers(this.key, this.qkey).subscribe((data) => {
          this.answers = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          this.sortAnswers();
        });
      });
    });

    this.form = new FormGroup({
      question: new FormControl(null)
    });

    this.answerForm = new FormGroup({
      answer: new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.roomComponent.sidenav.close();
  }

  sortAnswers() {
    this.tags = [];
    this.answers.forEach(answer => {
      let pos = this.tags.findIndex(t => t.tag === answer.tag);
      if (pos === -1) {
        this.tags.push({ tag: answer.tag, answers: [] });
        this.tags[this.tags.length - 1].answers.push(answer);
      } else
        this.tags[pos].answers.push(answer);
    });
    this.tags.sort((a, b) => {
      if (a.tag > b.tag)
        return 1;
      return -1;
    })
  }

  insertQuestion() {
    if (this.form.get('question').value) {
      let owner = JSON.parse(localStorage.getItem('currentUser'));
      this.roomsService.setQuestion(this.key, this.form.get('question').value, owner.username).then(data => {
        console.log(data);
      })
      this.form.reset();
    }
  }

  setTF(answer) {
    answer.isEditing = !answer.isEditing;
  }

  updateTag(answer) {
    answer.tag = answer.tag[0] == '#' ? answer.tag.substring(1) : answer.tag;
    this.roomsService.setTag(this.key, this.qkey, answer.key, answer.tag).then(() => {
      this.sortAnswers();
      this.setTF(answer);
    });
  }

  addAnswer() {
    let owner = JSON.parse(localStorage.getItem('currentUser'));
    this.roomsService.setAnswer(this.key, this.qkey, this.answerForm.get('answer').value, this.user.username)
      .then(res => {
        this.answerForm.reset();
      });
  }
}
