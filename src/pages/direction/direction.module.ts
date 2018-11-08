import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectionPage } from './direction';

@NgModule({
  declarations: [
    DirectionPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectionPage),
  ],
  exports: [
    DirectionPage
  ]
})
export class DirectionPageModule {}
