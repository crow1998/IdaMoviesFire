import { AuthService } from './../../../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../../../../services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieFull } from 'src/app/models/movies/movies_full/MovieFull.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as fromRoot from '../../../../reducers/app.reducer';
import * as UI from '../../../../reducers/actions/ui.actions';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId: number;
  movie: MovieFull;
  watchListMovies: MovieFull[] = [];
  isLoading$: Observable<boolean>;
  alreadyInWatchList = false;
  isAuth: boolean;
  subscriptions: Subscription[] = [];


  bgImageUrl = '';
  posterUrl = '';
  youtubeVideoUrl: SafeResourceUrl;
  imdbUrl = '';

  constructor(
    private movieService: MovieService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.subscriptions.push(
      this.store.select(fromRoot.getIsAuthenticated).subscribe(isAuth => {
        this.isAuth = isAuth;
      })
    );


    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.movieId = params['id'];

        this.onComponentInit();
      })
    );

    this.bgImageUrl = this.movieService.bgImageUrl;
    this.posterUrl = this.movieService.posterUrl;
  }

  onComponentInit(): void {

    this.subscriptions.push(
      this.store.select(fromRoot.getUserFull).subscribe(userFull => {

        this.watchListMovies = userFull.uData.watchList;
        this.getDetails();

      }, err => {
        this.getDetails();
      })
    );
  }

  getDetails(): void {
    this.subscriptions.push(
      this.movieService.getMovieDetails(this.movieId).subscribe((movieFull: MovieFull) => {

        this.movie = movieFull;
        this.imdbUrl = this.movieService.imdbUrl + movieFull.imdb_id;
        this.store.dispatch(new UI.StopLoading());
        this.validateWatchList();

      })
    );

    this.subscriptions.push(
      this.movieService.getVideo(this.movieId).subscribe(video => {


        if (video.results.length) {
          const videoFiltered = video.results.find(v => (v.type.toLowerCase() === 'trailer' && v.site.toLowerCase() === 'youtube'));
          this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieService.youtubeVideoUrl + videoFiltered.key);
        }

      })
    );
  }

  validateWatchList(): void {

    if (this.watchListMovies.length && (this.watchListMovies.map(i => i.id).indexOf(this.movie.id) > -1)) {
      this.alreadyInWatchList = true;
    } else {
      this.alreadyInWatchList = false;
    }
  }

  redirectToImdb(): void {
    window.open(this.imdbUrl, '_blank');
  }

  toggleWatchList(): void {

    if (!this.alreadyInWatchList) {
      this.movieService.addMovieToWatchList(this.movie);
      this.alreadyInWatchList = true;
    } else {
      this.movieService.removeMovieFromWatchList(this.movie);
      this.alreadyInWatchList = false;
    }

  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
