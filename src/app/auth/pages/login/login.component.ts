import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from '../../../shared/ui.actions';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loadingSubs: Subscription;
  cargando: boolean = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(event: Event){
    event.preventDefault();

    if(this.form.invalid){return;}

    this.store.dispatch(uiActions.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.auth.login(this.emailField.value, this.passwordField.value)
    .then((userfb) => {
      // Swal.close();
      this.store.dispatch(uiActions.stopLoading());
      this.router.navigate(['/']);
    })
    .catch((err: Error) => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    })
  }

  get emailField(){
    return this.form.get('email');
  }

  get passwordField(){
    return this.form.get('password');
  }

}
