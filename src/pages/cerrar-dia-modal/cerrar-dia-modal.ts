import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiaModel} from "../../models/DiaModel";
import {DiasCrudProvider} from "../../providers/dias-crud/dias-crud";
import {CrudProvider} from "../../providers/crud/crud";
import {ServicioModel} from "../../models/servicio.model";
import {Observable} from "rxjs";


@IonicPage()
@Component({
  selector: 'page-cerrar-dia-modal',
  templateUrl: 'cerrar-dia-modal.html',
})
export class CerrarDiaModalPage {
  diaForm: FormGroup;
  dia: DiaModel = {
    fecha: "",
    horaComienzo: "",
    horaFin: "",
    totalHoras: 0,
    partido: 0,
    libre:false,
    observaciones:"",
    user_id: "",
    transfersA: 0,
    transfersB: 0,
    transfersC: 0,
    traslados: 0,
    excursiones: 0,
    otrosServicios:0
  }

  servicios:any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private viewCtrl: ViewController,
              private diaCrud: DiasCrudProvider,
              private serviciosCrud: CrudProvider,
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
    this.serviciosCrud.obtenerServicios(this.dia.fecha).subscribe(serv=>{
      console.log(serv)
      serv.forEach(s=>{
        console.log(s.tipo)
        switch (s.tipo) {
          case 'transfer':
            if(s.paxs>=3 && s.paxs<=7) this.dia.transfersA += 1;
            if(s.paxs>=8 && s.paxs<=16) this.dia.transfersB += 1;
            if(s.paxs>=17) this.dia.transfersC+= 1;
            break
          case 'traslado':
            this.dia.traslados +=1;
            break;
          case  'excursion':
            this.dia.excursiones +=1;
            break;
          case  'otros':
            this.dia.otrosServicios +=1;
            break;
          case  'partido':
            // TODO
            break;
        }
      })
      console.log(this.dia);
    })
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
