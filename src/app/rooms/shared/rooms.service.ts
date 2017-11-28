import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RoomsService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getRooms() {
    return this.db.list('rooms').snapshotChanges();
  }

  getQuestions(key) {
    return this.db.list('rooms/'+key+'/questions').snapshotChanges();
  }

  setRooms(name: string, owner: string) {
    return this.db.list('rooms').push({
      name: name,
      owner: owner
    })
  }
  
  setQuestion(key: string, question: string, owner: string) {
    return this.db.list('rooms/' + key + '/questions').push({
      question: question,
      owner: owner
    });
  }

  getRoomByKey(key: string) {
    return this.db.object('rooms/' + key).valueChanges();
  }

  getQuestionByKey(key: string, qkey: string) {
    return this.db.object('rooms/'+key+'/questions/'+qkey).valueChanges();
  }

}
