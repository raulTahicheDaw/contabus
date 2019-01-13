import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesPage } from './mes';

@NgModule({
  declarations: [
    MesPage,
  ],
  imports: [
    IonicPageModule.forChild(MesPage),
  ],
})
export class MesPageModule {}
