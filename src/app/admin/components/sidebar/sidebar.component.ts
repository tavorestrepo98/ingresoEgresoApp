import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

import { Subscription } from 'rxjs';

import { AuthService } from './../../../core/services/auth.service';

import { User } from './../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: User = null;
  subs: Subscription;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs = this.store.select('auth').subscribe(({user}) => {
      this.usuario = user;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  cerrarSesion(){
    this.auth.logout()
    .then(_ => {
      this.router.navigate(['/auth']);
    })
  }

}
