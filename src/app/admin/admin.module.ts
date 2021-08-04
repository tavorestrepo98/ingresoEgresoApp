import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
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
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
