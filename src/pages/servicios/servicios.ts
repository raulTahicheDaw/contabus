import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private mensaje: MensajesProvider,
              private modalCtrl: ModalController
  ) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.user_uid = res.uid;
        console.log(this.user_uid)
        this.serviciosRef = this.database.list('users/'+this.user_uid+'/servicios',
          ref => ref.orderByChild('fecha').equalTo('2019-01-01'));
        this.servicios = this.serviciosRef.snapshotChanges().pipe(map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        }));
      } else {
        this.mensaje.crearToast('user not logged in');
      }
    });
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
          icon: 'trash',
          text: 'Limpiar dia',
          handler: () => {
            console.log('');
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

  addServicios(){
    const crearServicios =  this.modalCtrl.create('AddServicioModalPage');
    crearServicios.present();
  }

}
