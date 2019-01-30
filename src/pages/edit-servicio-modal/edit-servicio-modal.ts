import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudProvider} from "../../providers/crud/crud";
import {ServicioModel} from "../../models/servicio.model";

/**
 * Generated class for the EditServicioModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-servicio-modal',
  templateUrl: 'edit-servicio-modal.html',
})
export class EditServicioModalPage {

  loginForm: FormGroup;
  servicio: ServicioModel;
  user_id;
  lugarComienzo: string = '';
  lugarFin: string = '';
  tipo: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private crud: CrudProvider,
              private alertCtrl: AlertController) {
    this.loginForm = this.buildLoginForm();
    this.servicio = this.navParams.get('servicio');
    this.user_id = this.navParams.get('user_id');
    this.analizaTipo();
    this.analizaLugares();

  }

  close() {
    this.viewCtrl.dismiss();
  }

  analizaLugares() {
    var descripcion = this.servicio.descripcion;
    this.lugarComienzo = descripcion.split(this.tipo)[0].trim();
    this.lugarFin = descripcion.split(this.tipo)[1].trim();
  }

  /**
   * Analiza si la descripción del servicio para determinar si es un transfer, diferenciar entre entrada o salida
   * y llevar ese valor al formulario
   */
  analizaTipo() {
    var descripcion = this.servicio.descripcion;
    switch (this.servicio.tipo) {
      case 'transfer':
        if (descripcion.indexOf('entrada') >= 0) {
          this.tipo = 'entrada'
        } else {
          this.tipo = 'salida'
        }
        break;
      default:
        this.tipo = this.servicio.tipo;
    }

  }

  actualizarServicio(event: Event) {

    let data = this.loginForm.value;

    event.preventDefault();

    this.servicio.cliente = data.cliente;
    this.servicio.descripcion = data.descripcion;
    this.servicio.hora_inicio = data.horaComienzo;
    this.servicio.paxs = data.paxs;
    this.servicio.orden = data.orden;
    this.servicio.matricula = data.matricula;
    this.servicio.observaciones = data.observaciones;
    this.servicio.estado = "pendiente";
    this.servicio.tipo = data.tipo;
    if (data.tipo === 'partido') {
      this.servicio.descripcion = "Turno Partido"
    }else{
      this.servicio.descripcion = data.lugarComienzo + ' ' + data.tipo + ' ' + data.lugarFin;
    }


    const confirm = this.alertCtrl.create({
      title: 'Modificar servicio',
      message: '¿Quieres modificar este servicio?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.crud.updateServicio(this.servicio);
          }
        }
      ]
    })
    confirm.present()
    this.close();
  }

  /**
   * Cuando cambia el campo tipo
   * @param value
   */
  onChange(value) {
    if (value === 'entrada') {
      this.lugarComienzo = 'Apto'
      this.lugarFin = '';
    }
    if (value === 'salida') {
      this.lugarFin = 'Apto';
      this.lugarComienzo = '';
    }
  }

  private buildLoginForm() {
    return this.formBuilder.group({
      horaComienzo: ['', Validators.required],
      tipo: ['', Validators.required],
      lugarComienzo: ['', Validators.required],
      lugarFin: [''],
      paxs: [0],
      cliente: [''],
      orden: [''],
      matricula: [''],
      observaciones: [''],
    })
  }

}
