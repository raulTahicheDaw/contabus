import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicioModel} from "../../models/servicio.model";
import {CrudProvider} from "../../providers/crud/crud";

@IonicPage()
@Component({
  selector: 'page-add-servicio-modal',
  templateUrl: 'add-servicio-modal.html',
})
export class AddServicioModalPage {

  servicioForm: FormGroup;
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
              private crud: CrudProvider
  ) {
    this.servicioForm = this.buildLoginForm();
    this.servicio.fecha = this.navParams.get('fecha');
    this.servicio.user_id = this.navParams.get('user_id');
  }


  nuevoServicio(event: Event) {

    let data = this.servicioForm.value;

    event.preventDefault();
    this.servicio.cliente = data.cliente;
    this.servicio.descripcion = data.descripcion;
    this.servicio.hora_inicio = data.horaComienzo;
    this.servicio.paxs = data.paxs;
    this.servicio.orden = data.orden;
    this.servicio.matricula = data.matricula;
    this.servicio.observaciones = data.observaciones;
    this.servicio.estado = "pendiente";
    if (data.tipo === 'entrada' || data.tipo==='salida'){
      this.servicio.tipo = 'transfer'
    } else{
      this.servicio.tipo = data.tipo;
    }
    if (data.tipo === 'partido') {
      this.servicio.descripcion = "Turno Partido"
    }else{
      this.servicio.descripcion = data.lugarComienzo + ' ' + data.tipo + ' ' + data.lugarFin;
    }
    this.crud.addServicio(this.servicio);
    this.close();
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
