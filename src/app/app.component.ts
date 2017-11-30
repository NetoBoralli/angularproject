import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	lang: string = 'pt';
	isAnonymous:boolean;

	constructor(
		public translate: TranslateService,
		private firebase: AngularFireAuth
	) {
		translate.addLangs(['en', 'pt']);
		translate.setDefaultLang('pt');
		this.refreshSystemLanguage();
	}

	ngOnInit() {
		this.firebase.auth.onAuthStateChanged(user => {
			this.isAnonymous = user.isAnonymous;
		})
	}

	refreshSystemLanguage() {
		this.lang = (localStorage.getItem('preferedLang') ? localStorage.getItem('preferedLang') : this.translate.getBrowserLang());
		this.translate.use(this.lang.match(/en|pt/) ? this.lang : 'pt');
	}
}
