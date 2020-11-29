import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


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

  registerWithEmail(email: string, password: string, fullname: string) {
    return this.afu.createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.authState = user;
        const data = {
          email: user.user.email,
          fullname,
        };
        this.afs.doc('users/' + user.user.uid).set(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.authState = user;
        localStorage.setItem('user-id', user.user.uid);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  singout(): void {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }

}
