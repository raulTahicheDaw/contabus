import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditServicioModalPage } from './edit-servicio-modal';

@NgModule({
  declarations: [
    EditServicioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditServicioModalPage),
  ],
})
export class EditServicioModalPageModule {}
