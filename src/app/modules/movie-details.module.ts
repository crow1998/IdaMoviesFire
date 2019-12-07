import { MovieDetailsRoutingModule } from './routing-modules/movie-details-routing.module';
import { CastComponent } from './../components/movies/movie/cast/cast.component';
import { MovieDetailsComponent } from './../components/movies/movie/movie-details/movie-details.component';
import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    CastComponent
  ],
  imports: [
    SharedModule,
    MovieDetailsRoutingModule
  ]
})
export class MovieDetailsModule { }
