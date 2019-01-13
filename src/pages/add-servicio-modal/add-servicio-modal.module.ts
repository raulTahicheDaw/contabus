import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddServicioModalPage } from './add-servicio-modal';

@NgModule({
  declarations: [
    AddServicioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddServicioModalPage),
  ],
})
export class AddServicioModalPageModule {}
