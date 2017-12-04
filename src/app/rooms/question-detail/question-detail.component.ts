import { RoomComponent } from './../room/room.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { RoomsService } from './../shared/rooms.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  inscription: Subscription;
  key: string;
  qkey: string;
  question: any = {};
  answers;
  tags;
  form: FormGroup;
  room: any = {}
  owner: boolean = false;
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private roomsService: RoomsService
  ) { }

  ngOnInit() {
    this.inscription = this.aroute.params.subscribe((params: any) => {
      this.key = params['key'];
      this.qkey = params['qkey'];

      this.roomsService.getQuestionByKey(this.key, this.qkey).subscribe((data) => {
        this.question = data;
      });

      this.roomsService.getAnswers(this.key, this.qkey).subscribe((data) => {
        this.answers = data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.sortAnswers()
      });

      this.roomsService.getRoomByKey(this.key).subscribe((data) => {
        this.room = data;
        if(this.room.owner == this.user.username){
          this.owner = true;
        }else {
          this.owner = false;
        }
          
      });

    })

    this.form = new FormGroup({
      answer: new FormControl(null)
    });
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
  }

  setTF(answer) {
    answer.isEditing = !answer.isEditing;
  }

  updateTag(answer) {
    this.roomsService.setTag(this.key, this.qkey, answer.key, answer.tag).then(() => {
      this.sortAnswers();
    });
  }

  addAnswer() {
    let owner = JSON.parse(localStorage.getItem('currentUser'));
    this.roomsService.setAnswer(this.key, this.qkey, this.form.get('answer').value, this.user.username)
      .then(res => {
        console.log(res);
        this.form.reset();
        this.router.navigate([`rooms/${this.key}/question/${this.qkey}`]);
      });
  }

  back() {
    this.router.navigate(['rooms/' + this.key]);
  }

}
