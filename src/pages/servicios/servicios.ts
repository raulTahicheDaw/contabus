import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireAuth} from 'angularfire2/auth';
import {MensajesProvider} from "../../providers/mensajes/mensajes";

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {

  serviciosRef: AngularFireList<any>;
  servicios: Observable<any[]>;
  user_uid: any;
  dia: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private mensaje: MensajesProvider,
              private modalCtrl: ModalController
  ) {
    this.dia = this.formattedDate(new Date());
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.user_uid = res.uid;
        console.log(this.user_uid)
        this.obtenerServicios();
      } else {
        this.mensaje.crearToast('user not logged in');
      }
    });
  }

  onChange(dia) {
    this.dia = this.formattedDate(new Date(dia.year + '-' + dia.month + '-' + dia.day));
    this.obtenerServicios()
  }

  obtenerServicios() {
    console.log(this.dia)
    this.serviciosRef = this.database.list('users/' + this.user_uid + '/servicios',
      ref => ref.orderByChild('fecha').equalTo(this.dia));
    this.servicios = this.serviciosRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }));
  }

  showOptions() {
    const action = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          icon: 'attach',
          text: 'Nuevo servicio',
          handler: () => {
            this.addServicios()
          }
        },
        {
          icon: 'clipboard',
          text: 'Cerrar dia',
          handler: () => {
            console.log('Cerrar dia');
          }
        },
        {
          icon: 'close-circle',
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar clicked');
          }
        },
      ]
    });
    action.present();
  }

  addServicios() {
    const crearServicios = this.modalCtrl.create('AddServicioModalPage',
      {
        user_id: this.user_uid,
        fecha: this.dia
      });
    crearServicios.present();
  }

  formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

}
