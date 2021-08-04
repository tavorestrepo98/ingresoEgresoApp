import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from './../../../app.reducer';
import * as uiActions from '../../../shared/ui.actions';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(event: Event){

    event.preventDefault();

    if(this.form.invalid){return;}

    this.store.dispatch(uiActions.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.auth.register( this.nameField.value, this.emailField.value, this.passwordField.value)
    .then(_ => {
      // Swal.close();
      this.store.dispatch(uiActions.stopLoading());
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

  get nameField(){
    return this.form.get('name');
  }


  get emailField(){
    return this.form.get('email');
  }

  get passwordField(){
    return this.form.get('password');
  }

}
