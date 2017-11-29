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

  getAnswers(key: string, qkey: string){
    return this.db.list('rooms/'+key+'/questions/'+qkey+'/answers').snapshotChanges();
  }

  setRooms(name: string, owner: string, code: string) {
    return this.db.list('rooms').push({
      name: name,
      owner: owner,
      code: code
    })
  }
  
  setCode(code: string) {
    return this.db.list('codes').push({
      code: code 
    })
  }

  setQuestion(key: string, question: string, owner: string) {
    return this.db.list('rooms/' + key + '/questions').push({
      question: question,
      owner: owner
    });
  }

  setAnswer(key: string, qkey: string, answer: string, owner: string) {
    return this.db.list('rooms/'+key+'/questions/'+qkey+'/answers').push({
      answer: answer,
      owner: owner,
      tag: ""
    })
  }

  setTag(key: string, qkey: string, akey: string, tag: string) {
    return this.db.object('rooms/'+key+'/questions/'+qkey+'/answers/'+akey).update({
      tag: tag
    });
  }

  getRoomByKey(key: string) {
    return this.db.object('rooms/' + key).valueChanges();
  }

  getQuestionByKey(key: string, qkey: string) {
    return this.db.object('rooms/'+key+'/questions/'+qkey).valueChanges();
  }

  getRoomByCode(code: string) {
    return this.db.list('rooms', ref => ref.orderByChild('code').equalTo(code)).snapshotChanges();
  }

}
