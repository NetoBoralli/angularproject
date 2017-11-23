import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {

    constructor(
        private firebase: AngularFireAuth,
        private router: Router
    ) { }

    doLogin(email: string, password: string) {
        return this.firebase.auth.signInWithEmailAndPassword(email, password);
    }

    doSignUp(email: string, password: string) {
        return this.firebase.auth.createUserWithEmailAndPassword(email, password);
    }

    doUpdateOnSignUp(name: string) {
        return this.firebase.auth.currentUser.updateProfile({displayName: name, photoURL: null});
    }

}