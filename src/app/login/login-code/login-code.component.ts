import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LoginService } from '../shared/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyService } from './../../shared/services/helpers/key.service';
import { RoomsService } from './../../rooms/shared/rooms.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login-code',
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.css']
})
export class LoginCodeComponent implements OnInit {

  form: FormGroup;
  room;
  hintLabelCode: string = null;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private keyService: KeyService,
    private roomsService: RoomsService,
    private translate: TranslateService,
    private firebase: AngularFireAuth
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null),
      code: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  signInAnonymous() {
    if (!this.form.valid) return null;
    let name = this.form.get('username').value != null ? this.form.get('username').value : this.randomName();

    this.loginService.doAnonymousLogin()
      .then(res => {
        let uid = res.uid;
        this.loginService.doUpdateOnSignUp(name)
          .then((res) => {
            localStorage.setItem('currentUser', JSON.stringify({ username: name, uid: uid, anonymous: true }));
            this.roomsService.getRoomByCode(this.form.get('code').value).subscribe(changes => {
              this.room = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
              if (this.room[0] == null) {
                this.translate.get('NoCode').subscribe((val) => this.hintLabelCode = val);
                this.firebase.auth.currentUser.delete();
                localStorage.clear();
              }else{
                this.router.navigate(['/rooms/' + this.room[0].key]);
              }
            })
          })

      });

  }

  randomName() {
    return "Anonymous-" + this.keyService.generateId(4);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
