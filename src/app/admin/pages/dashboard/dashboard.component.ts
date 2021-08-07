import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as ieActions from '../../ingresoEgreso.actions';


import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { IngresoEgresoService } from './../../../core/services/ingreso-egreso.service';

import { IngresoEgreso } from '../../../core/models/ingresoEgreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subs =this.store.select('auth')
    .pipe(
      filter(({user}) => user != null),
      switchMap(({user}) => this.ingresoEgresoService.initIngresosEgresosListener(user.uid))
    )
    .subscribe((items: IngresoEgreso[]) => {
      this.store.dispatch(ieActions.setItems({items}));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ieActions.unSetItems());
  }

}
