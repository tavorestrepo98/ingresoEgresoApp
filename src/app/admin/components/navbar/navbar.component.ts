import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

import { Subscription } from 'rxjs';

import { User } from './../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: User = null;
  subs: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subs = this.store.select('auth').subscribe(({user}) => {
      this.usuario = user;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
