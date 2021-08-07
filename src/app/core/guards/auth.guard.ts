import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
      }),
      take(1)
    );
  }

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
