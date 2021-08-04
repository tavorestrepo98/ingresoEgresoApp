import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuth().pipe(
      map(user => {
        if(user){
          return true;
        }else{
          return false;
        }
      }),
      tap((isAuth: boolean) => {
        if(!isAuth){
          this.router.navigate(['/auth']);
        }
      })
    );
  }

}
