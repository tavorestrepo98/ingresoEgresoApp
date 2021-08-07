import { map } from 'rxjs/operators';
import { IngresoEgresoService } from './../../../core/services/ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription, Observable } from 'rxjs';

import { IngresoEgreso } from './../../../core/models/ingresoEgreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  subs: Subscription;
  items: IngresoEgreso[] = [];
  //items$: Observable<IngresoEgreso[]>;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subs = this.store.select('ingresosEgresos').subscribe(({items}) => {
      console.log('Estos son los items: ', items);
      this.items = items;
    })

  }

  ngOnDestroy(): void {
    //this.subs.unsubscribe();
  }

  borrarItem(id: string){
    this.ingresoEgresoService.borrarIngresoEgreso(id)
    .then(res => {
      console.log('Borrado con exito');
    })
    .catch(err => {
      console.log('Error: ', err);
    })
  }

}
