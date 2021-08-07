import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import * as authActions from '../../auth/auth.actions';

import { Observable, Subscription } from 'rxjs';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs: Subscription;
  private _user: User;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(){
    this.auth.authState.subscribe((user: firebase.default.User) => {
      if(user){
        this.userSubs = this.db.collection('users').doc(user.uid).valueChanges()
        .subscribe((usuario: User) => {
          this._user = {
            uid: usuario.uid,
            name: usuario.name,
            email: usuario.email
          };
          this.store.dispatch(authActions.setUser({user: {
            uid: usuario.uid,
            name: usuario.name,
            email: usuario.email
          }}));
        })
      }else{
        if(this.userSubs){
          this.userSubs.unsubscribe();
        }
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  isAuth(): Observable<firebase.default.User>{
    return this.auth.authState;
  }

  register(name: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {

      const newUser: User = {
        uid: user.uid,
        name,
        email
      }

      return this.db.collection('users').doc(user.uid).set(newUser);
    })
  }

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential>{
    return this.auth.signInWithEmailAndPassword(email, password)

  }

  logout(): Promise<void>{
    return this.auth.signOut();
  }

  get user(): User{
    return this._user;
  }

}
