import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MensajesProvider} from "../mensajes/mensajes";
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {DiaModel} from "../../models/DiaModel";
import {Observable} from "rxjs";
import {ServicioModel} from "../../models/servicio.model";

@Injectable()


export class DiasCrudProvider {

  user_uid: any;
  serviciosCollection: AngularFirestoreCollection<DiaModel>;
  servicios: Observable<ServicioModel[]>;

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
      this.serviciosCollection.doc(dia.fecha).set(dia).then((obj: any) => {
        this.mensaje.crearToast('Dia Cerrado')
        resolve(dia);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  public compruebaExisteDia(fecha) {
    this.serviciosCollection.doc(fecha).get()
      .subscribe(snap => {
        return snap.exists;
      })
  }


}
