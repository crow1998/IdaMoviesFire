import { CastProfileComponent } from './../components/movies/cast-profile/cast-profile.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { CastRoutingModule } from './routing-modules/cast-routing.module';

@NgModule({
  declarations: [
    CastProfileComponent
  ],
  imports: [
    SharedModule,
    CastRoutingModule
  ]
})
export class CastModule { }
