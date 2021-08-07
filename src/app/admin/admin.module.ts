import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingresoEgreso.reducer';
import { ChartsModule } from 'ng2-charts';

import { AdminRoutingModule } from './admin-routing.module';

import { CoreModule } from '../core/core.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { IngresoEgresoComponent } from './pages/ingreso-egreso/ingreso-egreso.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    EstadisticasComponent,
    DetalleComponent,
    IngresoEgresoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
