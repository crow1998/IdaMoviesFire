import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class HomeModule { }
