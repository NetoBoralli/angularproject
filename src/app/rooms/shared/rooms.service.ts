import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RoomsService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  //ROOMS
  getRoomsByOwner(owner) {
    return this.db.list('rooms', ref => ref.orderByChild('owner').equalTo(owner)).snapshotChanges();
  }

  getRooms() {
    return this.db.list('rooms').snapshotChanges();
  }

  setRooms(name: string, owner: string, code: string) {
    return this.db.list('rooms').push({
      name: name,
      owner: owner,
      code: code
      // participants: ""
    })
  }

  getRoomByKey(key: string) {
    return this.db.object('rooms/'+ key).valueChanges();
  }

  getRoomOn(key: string) {
    return this.db.list('rooms', ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }

  getRoomByCode(code: string) {
    return this.db.list('rooms', ref => ref.orderByChild('code').equalTo(code)).snapshotChanges();
  }

  //QUESTIONS
  getQuestions(key) {
    return this.db.list('rooms/' + key + '/questions').snapshotChanges();
  }
  
  setQuestion(key: string, question: string, owner: string) {
    return this.db.list('rooms/' + key + '/questions').push({
      question: question,
      owner: owner
    });
  }
  
  getQuestionByKey(key: string, qkey: string) {
    return this.db.object('rooms/' + key + '/questions/' + qkey).valueChanges();
  }

  updateQuestion(key:string, qkey:string, newquestion: string) {
    return this.db.object('rooms/'+key+'/questions/'+qkey).update({
      question: newquestion
    });
  }
  
  //ANSWERS
  getAnswers(key: string, qkey: string) {
    return this.db.list('rooms/' + key + '/questions/' + qkey + '/answers').snapshotChanges();
  }
  
  setAnswer(key: string, qkey: string, answer: string, owner: string) {
    return this.db.list('rooms/' + key + '/questions/' + qkey + '/answers').push({
      answer: answer,
      owner: owner,
      tag: ""
    });
  }
  
  setTag(key: string, qkey: string, akey: string, tag: string) {
    return this.db.object('rooms/' + key + '/questions/' + qkey + '/answers/' + akey).update({
      tag: tag
    });
  }

  //CODES
  getCodes() {
    return this.db.list('codes').valueChanges();
  }

  setCode(code: string) {
    return this.db.list('codes').push({
      code: code
    })
  }

  //ROOMS ASSOCIATE 
  setRoomAssociate(uid, keys){
    return this.db.list('rooms-associate').push({
      uid: uid,
      keys: keys
    });
  }

  updateRoomAssociate(key, keys) {
    return this.db.object('rooms-associate/'+key).update({
      keys: keys
    })
  }

  getRoomAssociate(uid) {
    return this.db.list('rooms-associate', ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges();
  }

  // setParticipants(key: string, arrayP) {
  //   return this.db.object('rooms/'+key).update({
  //     participants : arrayP
  //   })
  // }

  // getParticipants(key: string) {
  //   return this.db.list('rooms/'+key+'/participants').valueChanges();
  // }
}
