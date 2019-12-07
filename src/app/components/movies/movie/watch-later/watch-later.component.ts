import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as fromRoot from '../../../../reducers/app.reducer';
import * as UI from '../../../../reducers/actions/ui.actions';
import * as Movie from '../../../../reducers/actions/movie.actions';
import { Store } from '@ngrx/store';
import { MovieFull } from 'src/app/models/movies/movies_full/MovieFull.model';
import { MovieService } from 'src/app/services/movie.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit, OnDestroy {

  watchListMovies: MovieFull[] = [];
  watchListMoviesFiltered: MovieFull[] = [];
  isLoading$: Observable<boolean>;
  posterUrl = '';
  bgImageUrl = '';
  @ViewChild('searchInput') searchInput: ElementRef;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private movieService: MovieService,
    private authService: AuthService,
    private uiService: UiService) { }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select(fromRoot.getWatchList).subscribe(movies => {
        this.watchListMovies = movies;
      })
    );

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.posterUrl = this.movieService.posterUrl;
    this.bgImageUrl = this.movieService.bgImageUrlSmall;

    this.subscriptions.push(
      this.store.select(fromRoot.getUserFull).subscribe(userFull => {
        const movies = userFull.uData.watchList;
        setTimeout(() => {
          this.store.dispatch(new UI.StopLoading());
        }, 100);

        this.store.dispatch(new Movie.PopulateWatchList(movies));
      })
    );

  }

  searchItems(keyword: string) {

    if (keyword) {
      this.watchListMoviesFiltered = this.watchListMovies.filter(movie => movie.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0);
    }
  }

  getMovieDetails(movieId: number): void {
    this.uiService.getMovieDetails(movieId);
  }

  removeFromWatchList(movie: MovieFull) {
    this.movieService.removeMovieFromWatchList(movie);
    this.searchInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
