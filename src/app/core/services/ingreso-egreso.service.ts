import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { IngresoEgreso } from './../models/ingresoEgreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<any>{
    return this.db.collection('users').doc(`${this.auth.user.uid}`).collection('ingresosEgresos').add({
      ...ingresoEgreso
    });
  }

  initIngresosEgresosListener(uid: string): Observable<IngresoEgreso[]>{
    return this.db.collection('users').doc(`${this.auth.user.uid}`).collection('ingresosEgresos')
    .snapshotChanges()
    .pipe(
      map(data => {
        const newData = data.map(item => {
          return {
            ...item.payload.doc.data(),
            uid: item.payload.doc.id
          }
        });
        return newData as IngresoEgreso[];
      })
    )
  }

  borrarIngresoEgreso(id: string){
    return this.db.collection('users')
          .doc(`${this.auth.user.uid}`)
          .collection('ingresosEgresos')
          .doc(id)
          .delete();
  }


}
