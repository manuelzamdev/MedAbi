import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IDoctor, Users } from '../interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router, private afs: AngularFirestore) {

    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    // tslint:disable-next-line: no-string-literal
    return this.authState['email'];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  registerWithEmail(email: string, password: string, name: string, lastname: string, type: number, typeDoc?: number) {
    return this.afu.createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.authState = user;
        const datausers: Users = {
          email,
          name,
          lastname,
          type,
          uid: user.user.uid,
          personalid: '',
          phone: user.user.phone || '',
        };
        if (datausers.type === 0) {
           const dataDoctor: IDoctor = {...datausers, verified: false, category: typeDoc };
           this.afs.doc('users/' + user.user.uid).set(dataDoctor);
        } else {
            this.afs.doc('users/' + user.user.uid).set(datausers);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        console.log('que pashoo');
        this.authState = user;
        localStorage.setItem('user-id', user.user.uid);
      })
      .catch(error => {throw error});
  }

  singout(): void {
    this.afu.signOut();
    localStorage.removeItem('user-id');
    this.router.navigate(['/login']);
  }

}
