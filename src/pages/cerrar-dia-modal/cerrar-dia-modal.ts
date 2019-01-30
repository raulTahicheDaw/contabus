import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiaModel} from "../../models/DiaModel";
import {DiasCrudProvider} from "../../providers/dias-crud/dias-crud";


@IonicPage()
@Component({
  selector: 'page-cerrar-dia-modal',
  templateUrl: 'cerrar-dia-modal.html',
})
export class CerrarDiaModalPage {
  diaForm: FormGroup;
  dia: DiaModel = {
    fecha: '',
    horaComienzo: '',
    horaFin: '',
    observaciones: '',
    user_id: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private viewCtrl: ViewController,
              private diaCrud: DiasCrudProvider
  ) {
    this.diaForm = this.buildLoginForm();
    this.dia.fecha = this.navParams.get('fecha');
    this.dia.user_id = this.navParams.get('user_id');
  }

  /**
   * Agrega nuevo dia
   * @param event
   */
  nuevodia(event: Event) {
    let data = this.diaForm.value;
    event.preventDefault();

    this.dia.horaComienzo = data.horaComienzo;
    this.dia.horaComienzo = data.horaFin;
    this.dia.observaciones = data.observaciones;
    this.diaCrud.addDia(this.dia);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  private buildLoginForm() {
    return this.formBuilder.group({
      horaComienzo: ['', Validators.required],
      horaFin: ['', Validators.required],
      observaciones: ['']
    })
  }

}
