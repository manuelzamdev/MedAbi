import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    userDataEmitter = new EventEmitter();
    userTypeEmitter = new EventEmitter();
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

    getUserType(id: string) {
        this.angf.firestore.doc('users/' + id).get()
        .then( (snapshot) => {
            this.userTypeEmitter.emit(snapshot.data().type);
        })
        .catch(console.log);
    }

    getDoctors() {
        this.angf.firestore.collection('users').where('type', '==', 0).get()
        .then( (snapshot) => {
            const data = [];
            snapshot.forEach( (doctors) => data.push(doctors.data()));
            this.userDataEmitter.emit(data);
        })
        .catch(console.log);
    }
}
