import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController) {
  }

  showOptions(){
    const action = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          icon: 'attach',
          text: 'Nuevo servicio',
          handler: ()=>{
            console.log('Nuevo clicked');
          }
        },
        {
          icon: 'trash',
          text: 'Limpiar dia',
          handler: ()=>{
            console.log('limpiar clicked');
          }
        },
        {
          icon: 'close-circle',
          text: 'Cancelar',
          handler: ()=>{
            console.log('cancelar clicked');
          }
        },
      ]
    });
    action.present();
  }

}
