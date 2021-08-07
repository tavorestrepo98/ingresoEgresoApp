import { IngresoEgreso } from './../../../core/models/ingresoEgreso.model';
import { Component, OnInit } from '@angular/core';

import { AppState } from './../../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe(({items}) => {
      this.generarEstadistica(items);
    })
  }

  generarEstadistica(items: IngresoEgreso[]){
    items.forEach((item: IngresoEgreso) => {
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    })
  }

}
