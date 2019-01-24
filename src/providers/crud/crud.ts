import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import {ServicioModel} from "../../models/servicio.model";
import {MensajesProvider} from "../mensajes/mensajes";
import {map} from "rxjs/operators";


@Injectable()
export class CrudProvider {
  serviciosRef: AngularFireList<any>;
  user_uid: any;

  constructor(
    private database: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private mensaje: MensajesProvider
  ) {
    this.serviciosRef = this.database.list('tasks');
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.user_uid = res.uid;
        console.log(this.user_uid)
      } else {
        this.mensaje.crearToast('No está logueado');
      }
    });
  }

  public addServicio(servicio: ServicioModel) {
    this.serviciosRef = this.database.list('conductores/' + this.user_uid + '/servicios')
    this.serviciosRef.push({
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
    })
    this.mensaje.crearToast('Servicio Guardado')
  }

  obtenerServicios(dia) {
    this.serviciosRef = this.database.list('conductores/' + this.user_uid + '/servicios',
      ref => ref.orderByChild('fecha').equalTo(dia));
    return this.serviciosRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }));
  }
}
