import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from './pages/ingreso-egreso/ingreso-egreso.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: EstadisticasComponent },
      { path: 'ingreso-egreso', component: IngresoEgresoComponent },
      { path: 'detalle', component: DetalleComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
