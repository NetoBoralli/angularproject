import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {

    constructor(
        private firabase: AngularFireAuth,
        private router: Router
    ) { }

    doLogin(email: string, password: string) {
        return this.firabase.auth.signInWithEmailAndPassword(email, password);
    }

    doSignUp() {
    }

}