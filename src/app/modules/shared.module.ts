import { CarouselModule } from 'ngx-owl-carousel-o';
import { MovieSliderComponent } from './../components/movies/movie/movie-slider/movie-slider.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../components/movies/movie/movie-list/movie-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToHourPipe } from '../pipes/to-hour.pipe';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieSliderComponent,
    ToHourPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule
  ],
  exports: [
    MovieListComponent,
    MovieSliderComponent,
    ToHourPipe,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule
  ]
})
export class SharedModule { }
