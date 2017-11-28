import { RoomsService } from './../shared/rooms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

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

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private roomsService: RoomsService
  ) { }

  ngOnInit() {
    this.inscription = this.aroute.params.subscribe((params: any) => {
      this.key = params['key'];
      this.qkey = params['qkey'];

      this.roomsService.getQuestionByKey(this.key, this.qkey).subscribe( (data) => {
        this.question = data;
      })
    })
  }

  back(){
    this.router.navigate(['rooms/'+this.key]);
  }

}
