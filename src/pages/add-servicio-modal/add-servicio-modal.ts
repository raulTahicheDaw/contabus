import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicioModel} from "../../models/servicio.model";
import {defaultThrottleConfig} from "rxjs/internal-compatibility";

@IonicPage()
@Component({
  selector: 'page-add-servicio-modal',
  templateUrl: 'add-servicio-modal.html',
})
export class AddServicioModalPage {

  loginForm: FormGroup;
  servicio: ServicioModel = {
    cliente: '',
    fecha: '',
    dia_id: '',
    descripcion: '',
    hora_fin: '',
    orden: '',
    paxs: 0,
    hora_inicio: '',
    estado: '',
    tipo: '',
    user_id: '',
    observaciones: '',
    matricula: ''
  };
  lugarComienzo:string = '';
  lugarFin:string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.buildLoginForm();
    this.servicio.fecha = this.navParams.get('fecha');
    this.servicio.user_id = this.navParams.get('user_id');
  }


  nuevoServicio(event: Event) {

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
    switch (data.tipo) {
      case 'entrada':
      case 'salida':
        this.servicio.tipo = 'transfer';
        break;
      default:
        this.servicio.tipo = data.tipo;
    }
    this.servicio.descripcion = data.lugarComienzo + ' ' + data.tipo + ' ' + data.lugarFin
    console.log(this.servicio)
  }

  close() {
    this.viewCtrl.dismiss();
  }

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
