import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import {Observable} from "rxjs";
import {AngularFireAuth} from '@angular/fire/auth';
import {MensajesProvider} from "../../providers/mensajes/mensajes";
import {LoginPage} from "../login/login";
import {CrudProvider} from "../../providers/crud/crud";
import {DiasCrudProvider} from "../../providers/dias-crud/dias-crud";

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  estadoDia: boolean = true;
  servicios: Observable<any[]>;
  user_uid: any;
  dia: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              public afAuth: AngularFireAuth,
              private mensaje: MensajesProvider,
              private modalCtrl: ModalController,
              private crud: CrudProvider,
              private alertCtrl: AlertController,
              private diasProvider: DiasCrudProvider
  ) {
    this.dia = this.formattedDate(new Date());
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user_uid = res.uid;
        this.servicios = this.crud.obtenerServicios(this.dia);
        console.log(this.diasProvider.compruebaExisteDia('2019-02-14'));
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
          cssClass: 'NuevoIcon',
          handler: () => {
            this.addServicios()
          }
        },
        {
          icon: 'clipboard',
          text: 'Cerrar dia',
          cssClass: 'CerrarIcon',
          handler: () => {
            this.addDia();
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
   * Opciones de servicio
   */
  opcionesServicio(servicio) {
    const action = this.actionSheetCtrl.create({
      title: 'Opciones',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          icon: 'repeat',
          text: 'Cambiar estado',
          cssClass: 'CambiarEstadoIcon',
          handler: () => {
            this.cambiarEstado(servicio);
          }
        },
        {
          icon: 'trash',
          text: 'Borrar servicio',
          cssClass: 'DeleteIcon',
          handler: () => {
            this.remServicio(servicio);
          }
        },
        {
          icon: 'create',
          cssClass: 'EditIcon',
          text: 'Modificar Servicio',
          handler: () => {
            this.editServicio(servicio);
          }
        },
        {
          icon: 'close-circle',
          text: 'Cancelar',
          role: 'cancel',
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

  addDia() {
    const crearDia = this.modalCtrl.create('CerrarDiaModalPage',
      {
        user_id: this.user_uid,
        fecha: this.dia
      })
    crearDia.present();
  }

  /**
   * Abre modal Editar servicio
   */
  editServicio(servicio) {
    const editarServicios = this.modalCtrl.create('EditServicioModalPage', {servicio, user_id: this.user_uid});
    editarServicios.present();
  }

  /**
   * Borrar servicio
   */
  remServicio(servicio) {
    const confirm = this.alertCtrl.create({
      title: 'Borrar servicio',
      message: '¿Quieres borrar este servicio?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            this.crud.borrarServicio(servicio.id);
          }
        }
      ]
    })
    confirm.present();
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

  /**
   * Cambia el estado del servicio
   */

  cambiarEstado(servicio) {

    let alert = this.alertCtrl.create();
    alert.setTitle('Cambiar estado');
    switch (servicio.estado) {
      case 'pendiente':
        alert.addInput({
          type: 'radio',
          label: 'Terminado',
          value: 'terminado',
        });
        alert.addInput({
          type: 'radio',
          label: 'Cancelado',
          value: 'cancelado',
        });
        break;
      case 'terminado':
        alert.addInput({
          type: 'radio',
          label: 'Cancelado',
          value: 'cancelado',
        });
        alert.addInput({
          type: 'radio',
          label: 'Pendiente',
          value: 'pendiente',
        });
        break;
      case 'cancelado':
        alert.addInput({
          type: 'radio',
          label: 'Pendiente',
          value: 'pendiente',
        });
        alert.addInput({
          type: 'radio',
          label: 'Terminado',
          value: 'terminado',
          checked: true
        });

    }

    alert.addButton('Cancelar');

    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == 'terminado') {

          this.horaFin(servicio.id, data, servicio.hora_inicio)

        } else {

          this.crud.actualizaEstado(servicio.id, data);

        }
      }
    });
    alert.present();
  }

  /**
   * Pedir hora fin
   */

  horaFin(id, datos, horaInicio) {
    const promptHora = this.alertCtrl.create({
      title: 'Hora Fin',
      message: 'Introduce la hora de finalización del servicio',
      inputs: [
        {
          name: 'hora_fin',
          type: 'time'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: data => {
            if (horaInicio > data.hora_fin) {
              const confirm = this.alertCtrl.create({
                title: 'Hora Inicio posterior a la hora fin',
                message: 'Has introducido una hora de finalización anterior a la de comienzo. ¿Es correcto?',
                buttons: [
                  {
                    text: 'No. Cancelar.',
                    role: 'cancel'
                  },
                  {
                    text: 'Sí, es correcto',
                    handler: () => {
                      this.crud.actualizaEstado(id, datos, data.hora_fin)
                    }
                  }
                ]
              })
              confirm.present();
            }else {
              this.crud.actualizaEstado(id, datos, data.hora_fin)
            }
          }
        }
      ]
    })
    promptHora.present();
  }

}
