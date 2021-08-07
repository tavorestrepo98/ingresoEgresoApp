import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';


@NgModule({
  declarations: [
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrdenIngresoPipe
  ]
})
export class CoreModule { }
