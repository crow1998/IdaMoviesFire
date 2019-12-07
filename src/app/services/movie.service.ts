import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MovieFull } from '../models/movies/movies_full/MovieFull.model';
import { MovieCollection } from '../models/movies/movies_collection/MovieCollection.model';
import { Cast } from '../models/Cast.model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import * as fromRoot from '../reducers/app.reducer';
import * as Movie from '../reducers/actions/movie.actions';
import { UiService } from './ui.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnDestroy {

  private apiKey = 'd1250751a8ae89f9a5dd5bcc28880e8a';

  // movieUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d1250751a8ae89f9a5dd5bcc28880e8a&language=en-US&page=1';
  startUrl = 'https://api.themoviedb.org/3/';
  bgImageUrl = 'http://image.tmdb.org/t/p/w1280/';
  bgImageUrlSmall = 'http://image.tmdb.org/t/p/w780/';
  posterUrl = 'http://image.tmdb.org/t/p/w342/';
  youtubeVideoUrl = 'https://www.youtube.com/embed/';
  imdbUrl = 'https://www.imdb.com/title/';

  watchListMovies: MovieFull[];
  subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private db: AngularFirestore,
    private store: Store<fromRoot.State>,
    private uiService: UiService) {

    this.subscriptions.push(
      this.store.select(fromRoot.getWatchList).subscribe(watchList => {
        this.watchListMovies = watchList;
      })
    );
  }

  getAllMovies(pageId: number): Observable<any> {
    const moviesUrl = `${this.startUrl}discover/movie?api_key=${this.apiKey}&page=${pageId}`;

    return this.http.get<any>(moviesUrl);
  }

  getCollectionMovies(movieType: string, pageId: number) {
    const moviesUrl = `${this.startUrl}movie/${movieType}?api_key=${this.apiKey}&language=en-US&page=${pageId}`;

    return this.http.get<MovieCollection>(moviesUrl);
  }

  getSearchedMovies(keyWord: string, pageId: number): Observable<MovieCollection> {
    const moviesUrl = `${this.startUrl}search/movie?api_key=${this.apiKey}&query=${keyWord}&page=${pageId}`;

    return this.http.get<MovieCollection>(moviesUrl);
  }

  getMovieDetails(movieId: number): Observable<MovieFull> {
    const movieUrl = `${this.startUrl}movie/${movieId}?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<MovieFull>(movieUrl);
  }

  getVideo(movieId: number): Observable<any> {
    const videosUrl = `${this.startUrl}movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<any>(videosUrl);
  }

  getCast(movieId: number): Observable<any> {
    const castUrl = `${this.startUrl}movie/${movieId}/credits?api_key=${this.apiKey}`;
    return this.http.get<any>(castUrl);
  }

  getCastDetails(castId: number): Observable<Cast> {
    const castUrl = `${this.startUrl}person/${castId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<Cast>(castUrl);
  }

  getCastMovieList(castId: string): Observable<any> {
    const moviesUrl = `${this.startUrl}person/${castId}/movie_credits?api_key=${this.apiKey}`;
    return this.http.get<any>(moviesUrl);
  }

  getSimilarMovies(movieId: number): Observable<MovieCollection> {
    const movieUrl = `${this.startUrl}movie/${movieId}/similar?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<MovieCollection>(movieUrl);
  }

  addMovieToWatchList(movie: MovieFull): void {

    movie = {
      ...movie,
      add_date: new Date()
    };

    this.watchListMovies.unshift(movie);
    this.store.dispatch(new Movie.PopulateWatchList(this.watchListMovies));

    this.db.collection('users')
      .doc(this.authService.curUserId)
      .update({ 'uData.watchList': this.watchListMovies })
      .then(result => {

      })
      .catch(err => {
      });

    this.uiService.openSnackBar('Successfully Added To WatchList', null, 700);
  }

  removeMovieFromWatchList(movie: MovieFull): void {

    this.watchListMovies = this.watchListMovies.filter(i => i.id !== movie.id);
    this.store.dispatch(new Movie.PopulateWatchList(this.watchListMovies));

    this.db.collection('users')
      .doc(this.authService.curUserId)
      .update({ 'uData.watchList': this.watchListMovies })
      .then(result => {

      })
      .catch(err => {
      });
    this.uiService.openSnackBar('Successfully Removed From WatchList', null, 700);
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
