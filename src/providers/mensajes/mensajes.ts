import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class MensajesProvider {

  constructor(private toastCtrl: ToastController) {
  }


  crearToast(mensaje){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });

    toast.present();
  }
}
