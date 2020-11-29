import { Injectable } from "@angular/core";

import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  currentUserEmail: string;
  authError: any;

  constructor(public firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  loginWithEmail(email: string, password: string) {
    let thisService = this;
    thisService.authError = null;
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.currentUserEmail = value.user.email;
      })
      .catch(error => {
        console.log(error.message);
        thisService.authError = error;
      });
  }

  loginWithGoogle() {
    let thisService = this;
    thisService.authError = null;
    this.firebaseAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => {
        this.currentUserEmail = value.user.email;
      })
      .catch(error => {
        console.log(error.message);
        thisService.authError = error;
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.currentUserEmail = null;
  }
}
