import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    userDataEmitter = new EventEmitter();
    constructor(private angf: AngularFirestore) {
        /* firebase.default.initializeApp(environment.firebase); */
    }

    getUserInfo(id: string) {
        this.angf.firestore.doc('users/' + id).get()
        .then( (snapshot) => {
            this.userDataEmitter.emit(snapshot.data());
        })
        .catch(err => { });
    }
}
