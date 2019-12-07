import { MoviesRoutingModule } from './routing-modules/movies-routing.module';
import { FormsModule } from '@angular/forms';
import { MovieSearchComponent } from './../components/movies/movie/movie-search/movie-search.component';
import { MoviesComponent } from './../components/movies/movies.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieSearchComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
