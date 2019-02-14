import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {ServicioModel} from "../../models/servicio.model";
import {MensajesProvider} from "../mensajes/mensajes";
import {Observable} from "rxjs";
import 'rxjs/Rx';


@Injectable()
export class CrudProvider {
  serviciosCollection: AngularFirestoreCollection<ServicioModel>;
  servicios: Observable<any>;
  user_uid: any;

  constructor(
    private database: AngularFirestore,
    public afAuth: AngularFireAuth,
    private mensaje: MensajesProvider,
  ) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user_uid = res.uid;
      } else {
        this.mensaje.crearToast('No está logueado');
      }
    });

  }


  public updateServicio(servicio) {

    var updates = {
      cliente: servicio.cliente,
      fecha: servicio.fecha,
      dia_id: servicio.dia_id,
      descripcion: servicio.descripcion,
      hora_fin: servicio.hora_fin,
      orden: servicio.orden,
      paxs: servicio.paxs,
      hora_inicio: servicio.hora_inicio,
      estado: servicio.estado,
      tipo: servicio.tipo,
      observaciones: servicio.observaciones,
      matricula: servicio.matricula,
    }

    return new Promise((resolve, reject) => {
      this.database.collection('conductores/' + this.user_uid + '/servicios')
        .doc(servicio.id)
        .update(updates)
        .then((obj: any) => {
          this.mensaje.crearToast('Servicio Modificado')
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public addServicio(servicio: ServicioModel) {
    return new Promise((resolve, reject) => {
      this.serviciosCollection.add(servicio).then((obj: any) => {
        this.mensaje.crearToast('Servicio Guardado')
        resolve(servicio);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  borrarServicio(key) {

    return new Promise((resolve, reject) => {
      this.database.collection('conductores/' + this.user_uid + '/servicios')
        .doc(key)
        .delete()
        .then((obj: any) => {
          this.mensaje.crearToast('Servicio Borrado')
          resolve(obj);
        })
        .catch((error: any) => {
          console.log(error)
          this.mensaje.crearToast(error);
          reject(error);
        });
    });

  }

  obtenerServicios(dia) {
    this.serviciosCollection = this.database.collection('conductores/' + this.user_uid + '/servicios',
      ref => ref.where('fecha', '==', dia).orderBy('hora_inicio'));
    this.servicios = this.serviciosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as ServicioModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      });

    });
    return this.servicios;
  }

  actualizaEstado(id, estado, hora_fin = '') {

    var updates = {
      estado: estado,
      hora_fin: hora_fin
    }

    return new Promise((resolve, reject) => {
      this.database.collection('conductores/' + this.user_uid + '/servicios')
        .doc(id)
        .update(updates)
        .then((obj: any) => {
          this.mensaje.crearToast('Servicio Modificado')
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

  }

}
