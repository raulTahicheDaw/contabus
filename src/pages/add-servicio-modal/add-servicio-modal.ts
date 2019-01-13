import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicioModel} from "../../models/servicio.model";

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
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.buildLoginForm();
  }

  nuevoServicio(event: Event){

    let data = this.loginForm.value;

    event.preventDefault();
    this.servicio.cliente = data.cliente;
    this.servicio.descripcion = data.descripcion;
    this.servicio.hora_inicio = data.hora_inicio;
    this.servicio.orden = data.orden;
    this.servicio.orden = data.orden;
    this.servicio.orden = data.orden;
    console.log(this.servicio)
  }

  close(){
    this.viewCtrl.dismiss();
  }

  private buildLoginForm() {
    return this.formBuilder.group({
      horaComienzo: ['', Validators.required],
      tipo: ['', Validators.required],
      lugarComienzo:['',Validators.required],
      lugarFin:['',Validators.required],
      paxs:[0],
      cliente:[''],
      orden:[''],
      matricula:[''],
      observaciones:[''],
    })
  }

}
