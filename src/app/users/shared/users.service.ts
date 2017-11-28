import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UsersService {

	constructor(
		private http: Http,
		private db: AngularFireDatabase
	) { }

	getItens() {
		return this.db.list('rooms').snapshotChanges();
	}
	
	setItens(name: string, owner: string){
		return this.db.list('rooms').push({
			name: name,
			owner: owner
		})
	}

	// get(username: string): Observable<any> {
	// 	return this.http
	// 		.get(`users/${username}`)
	// 		.map((res: Response) => res.json())
	// 		.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	// }
}