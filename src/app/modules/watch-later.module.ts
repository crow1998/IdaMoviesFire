import { WatchLaterRoutingModule } from './routing-modules/watch-later-routing.module';
import { NgModule } from '@angular/core';
import { WatchLaterComponent } from '../components/movies/movie/watch-later/watch-later.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    WatchLaterComponent
  ],
  imports: [
    SharedModule,
    WatchLaterRoutingModule
  ]
})
export class WatchLaterModule { }
