import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireAuth} from 'angularfire2/auth';
import {MensajesProvider} from "../../providers/mensajes/mensajes";
import {LoginPage} from "../login/login";
import {CrudProvider} from "../../providers/crud/crud";

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {

  servicios: Observable<any[]>;
  user_uid: any;
  dia: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private mensaje: MensajesProvider,
              private modalCtrl: ModalController,
              private crud: CrudProvider
  ) {
    this.dia = this.formattedDate(new Date());
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user_uid = res.uid;
        console.log(this.user_uid)
        this.servicios = this.crud.obtenerServicios(this.dia);
      } else {
        this.mensaje.crearToast('user not logged in');
        this.navCtrl.setRoot(LoginPage)
      }
    });
  }

  /**
   * Obtener servicios cuando cambiamos fecha
   * @param dia
   */
  onChange(dia) {
    this.dia = this.formattedDate(new Date(dia.year + '-' + dia.month + '-' + dia.day));
    this.servicios = this.crud.obtenerServicios(this.dia);
  }

  /**
   * Opciones del menu
   */
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

  /**
   * Abre Modal Crear nuevos servicios
   */
  addServicios() {
    const crearServicios = this.modalCtrl.create('AddServicioModalPage',
      {
        user_id: this.user_uid,
        fecha: this.dia
      });
    crearServicios.present();
  }

  /**
   * Construye fecha
   * @param d
   */
  formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

}
