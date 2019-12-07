import { AuthGuard } from './components/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', loadChildren: './modules/movies.module#MoviesModule' },
  { path: 'movies/movie', loadChildren: './modules/movie-details.module#MovieDetailsModule' },
  { path: 'cast', loadChildren: './modules/cast.module#CastModule' },
  { path: 'watchLater', loadChildren: './modules/watch-later.module#WatchLaterModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
