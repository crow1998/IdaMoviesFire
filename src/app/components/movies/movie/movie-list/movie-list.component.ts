import { ResultType } from './../../../../models/ResultType.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Search } from 'src/app/models/movies/Search.model';
import * as fromRoot from '../../../../reducers/app.reducer';
import * as UI from '../../../../reducers/actions/ui.actions';
import * as Movie from '../../../../reducers/actions/movie.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  castId: number;
  resultType: ResultType;
  movies = [];
  posterUrl = '';
  pageId = 1;
  nothingFound = true;
  subscriptions: Subscription[] = [];

  searchParameters: Search = {
    isSearched: false,
    searchForm: {
      keywords: ''
    }
  };

  constructor(
    private movieService: MovieService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.subscriptions.push(
      this.uiService.isScrolled.subscribe(isScrolled => {

        if (isScrolled && this.resultType.provider !== 'cast') {
          this.pageId++;

          this.validateSearch();
        }
      })
    );

    this.subscriptions.push(
      this.store.select(fromRoot.getSearchParams).subscribe((searchParameters: Search) => {

        this.movies = [];
        this.pageId = 1;
        this.searchParameters = searchParameters;

        if (searchParameters.isSearched) {
          this.validateSearch();
        }
      })
    );

    this.subscriptions.push(
      this.store.select(fromRoot.getResultType).subscribe(resultType => {
        this.resultType = resultType;
        this.onComponentInit();

      })
    );

    this.posterUrl = this.movieService.posterUrl;
  }

  onComponentInit() {
    this.movies = [];
    this.pageId = 1;

    if (this.resultType.provider === 'cast') {
      this.getCastMovies();

    } else {
      this.store.dispatch(new Movie.ResetSearch());

      switch (this.resultType.data) {
        case 'all_movies':
          this.getAllMovies();
          break;
        default:
          this.getCollectionMovies();
          break;
      }
    }
  }

  validateSearch(): void {

    if (this.resultType) {

      if (this.searchParameters.searchForm.keywords) {
        this.getSearchedMovies();
      } else {

        if (this.resultType.data === 'all_movies') {
          this.getAllMovies();
        } else {
          this.getCollectionMovies();
        }
      }
    }
  }

  validateResults(): void {
    if (this.movies.length) {
      this.nothingFound = false;
    } else {
      this.nothingFound = true;
    }
  }

  getCollectionMovies(): void {
    this.nothingFound = false;

    this.subscriptions.push(
      this.movieService.getCollectionMovies(this.resultType.data, this.pageId).subscribe(movies => {
        const movieResults = movies.results;

        movieResults.forEach(movie => {
          this.movies.push(movie);
        });
        this.store.dispatch(new UI.StopLoading());

        this.validateResults();
      })
    );
  }

  getAllMovies(): void {
    this.nothingFound = false;

    this.subscriptions.push(
      this.movieService.getAllMovies(this.pageId).subscribe(movies => {
        const movieResults = movies.results;

        movieResults.forEach(movie => {
          this.movies.push(movie);
        });
        this.store.dispatch(new UI.StopLoading());

        this.validateResults();
      })
    );
  }

  getCastMovies(): void {
    this.nothingFound = false;

    this.subscriptions.push(
      this.movieService.getCastMovieList(this.resultType.data).subscribe(movies => {
        this.movies = Array.from(movies.cast);

        this.validateResults();
      })
    );
  }

  getMovieDetails(movieId: number): void {
    this.uiService.getMovieDetails(movieId);
  }


  getSearchedMovies(): void {
    this.nothingFound = false;

    this.subscriptions.push(
      this.movieService.getSearchedMovies(this.searchParameters.searchForm.keywords, this.pageId)
        .subscribe(movies => {
          const movieResults = movies.results;

          movieResults.forEach(movie => {
            this.movies.push(movie);
          });

          this.validateResults();
        })
    );
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
