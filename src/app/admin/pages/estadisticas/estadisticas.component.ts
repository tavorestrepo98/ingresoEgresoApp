import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IngresoEgreso } from './../../../core/models/ingresoEgreso.model';
import { AppStateWithIngresoEgreso } from './../../ingresoEgreso.reducer';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

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

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];

  constructor(
    private store: Store<AppStateWithIngresoEgreso>
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
      this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
    })
  }

}
