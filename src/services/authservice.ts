import { Injectable } from "@angular/core";
import firebase from 'firebase';

@Injectable()
export class Authservice {

  signUpFireBase(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  signInFireBase(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  logOutFireBase(): Promise<any> {
    return firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }
}
