import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaPage } from './dia';

@NgModule({
  declarations: [
    DiaPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaPage),
  ],
})
export class DiaPageModule {}
