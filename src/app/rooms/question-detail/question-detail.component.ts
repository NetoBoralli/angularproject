import { RoomsService } from './../shared/rooms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { FormControl, FormGroup } from '@angular/forms';

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
      console.log('tag updated')
      this.sortAnswers();
    });
  }

  addAnswer() {
    let owner = JSON.parse(localStorage.getItem('currentUser'));
    this.roomsService.setAnswer(this.key, this.qkey, this.form.get('answer').value, owner.username).then((data) => {
      console.log(data);
    });
    this.form.reset();
  }

  back() {
    this.router.navigate(['rooms/' + this.key]);
  }

}
