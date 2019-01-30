import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import {MensajesProvider} from "../mensajes/mensajes";
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {DiaModel} from "../../models/DiaModel";
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Injectable()


export class DiasCrudProvider {

  user_uid: any;
  serviciosCollection: AngularFirestoreCollection<DiaModel>;

  constructor(private database: AngularFirestore,
              public afAuth: AngularFireAuth,
              private mensaje: MensajesProvider,) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user_uid = res.uid;
        this.serviciosCollection = this.database.collection('conductores/' + this.user_uid + '/dias')
      } else {
        this.mensaje.crearToast('No está logueado');
      }
    });
  }

  public addDia(dia: DiaModel) {
    return new Promise((resolve, reject) => {
      this.serviciosCollection.add(dia).then((obj: any) => {
        this.mensaje.crearToast('Dia Cerrado')
        resolve(dia);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

}