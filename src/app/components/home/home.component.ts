import { Store } from '@ngrx/store';
import { Result } from './../../models/movies/movies_collection/categories/Result.model';
import { MovieFull } from '../../models/movies/movies_full/MovieFull.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieService } from 'src/app/services/movie.service';
import { MovieCollection } from 'src/app/models/movies/movies_collection/MovieCollection.model';
import * as fromRoot from '../../reducers/app.reducer';
import * as UI from '../../reducers/actions/ui.actions';
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  bigSlides: Result[] = [];
  popularMoviesBlock: Result[] = [];
  popularMovieBlock: Result;
  bgImageUrl = '';
  isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(
    private movieService: MovieService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoWidth: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_forward</i>'],
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      900: {
        items: 2,
        slideBy: 2
      }
    },
    nav: true
  };
  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.bgImageUrl = this.movieService.bgImageUrl;

    this.subscriptions.push(
      this.movieService.getCollectionMovies('now_playing', 1).subscribe((movies: MovieCollection) => {

        this.bigSlides = movies.results;
        this.store.dispatch(new UI.StopLoading());
      })
    );

    this.subscriptions.push(
      this.movieService.getCollectionMovies('popular', 1).subscribe((movies: MovieCollection) => {
        this.popularMovieBlock = movies.results[4];
        this.popularMoviesBlock = movies.results.slice(0, 4);

      })
    );

  }

  getMovieDetails(movieId: number): void {
    this.uiService.getMovieDetails(movieId);
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
