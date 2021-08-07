import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from './../../../app.reducer';
import * as uiActions from '../../../shared/ui.actions';

import { Subscription } from 'rxjs';

import { IngresoEgresoService } from './../../../core/services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';

  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadingSubs = this.store.select('ui').subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  private buildForm(){
    this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(4)]],
      monto: [0, [Validators.required, Validators.min(0)]]
    });
  }

  guardar(event: Event){
    event.preventDefault();

    this.store.dispatch(uiActions.isLoading());

    this.ingresoEgresoService.crearIngresoEgreso({...this.ingresoEgresoForm.value, tipo: this.tipo})
    .then(result => {
      console.log(result);
      Swal.fire('Registro creado', this.descripcionField.value, 'success');
      this.ingresoEgresoForm.reset();
      this.store.dispatch(uiActions.stopLoading());
    })
    .catch(err => {
      console.log('Ocurrió un Error', err);
      Swal.fire('Error', err.message, 'error');
      this.ingresoEgresoForm.reset();
      this.store.dispatch(uiActions.stopLoading());
    })
  }

  get montoField(){
    return this.ingresoEgresoForm.get('monto');
  }

  get descripcionField(){
    return this.ingresoEgresoForm.get('descripcion');
  }

}
