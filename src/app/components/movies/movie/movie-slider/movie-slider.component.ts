import { MovieFull } from 'src/app/models/movies/movies_full/MovieFull.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieCollection } from 'src/app/models/movies/movies_collection/MovieCollection.model';
import { MovieService } from './../../../../services/movie.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/movies/movies_collection/categories/Result.model';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss']
})
export class MovieSliderComponent implements OnInit, OnDestroy {

  moviedId: number;
  movieSlider: Result[] = [];
  posterUrl: string;
  sliderTitle: string;
  @Input() movieType = '';
  subscriptions: Subscription[] = [];

  constructor(
    private movieService: MovieService,
    private uiService: UiService,
    private route: ActivatedRoute) { }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoWidth: true,
    dots: false,
    navSpeed: 200,
    smartSpeed: 200,
    slideBy: 1,
    margin: 20,
    navText: ['<i class="material-icons">keyboard_arrow_left</i>', '<i class="material-icons">keyboard_arrow_right</i>'],
    responsive: {
      0: {
        items: 2,
        slideBy: 2
      },
      450: {
        items: 3,
        slideBy: 3
      },
      700: {
        items: 5,
        slideBy: 5
      }
    },
    nav: true
  };


  ngOnInit() {

    this.posterUrl = this.movieService.posterUrl;

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.moviedId = params['id'];
      })
    );

    switch (this.movieType) {
      case 'similarMovies':
        this.getSimilarMovies();
        break;
      case 'topRatedMovies':
        this.getTopRatedMovies();
        break;
      case 'upcomingMovies':
        this.getUpcomingMovies();
        break;
      default:
        break;
    }

  }

  getSimilarMovies(): void {
    this.sliderTitle = 'Similar Movies';

    this.subscriptions.push(
      this.movieService.getSimilarMovies(this.moviedId)
        .subscribe((movies: MovieCollection) => {
          this.movieSlider = movies.results;
        })
    );
  }
  getTopRatedMovies(): void {
    this.sliderTitle = 'Top Rated Movies';

    this.subscriptions.push(
      this.movieService.getCollectionMovies('top_rated', 1)
        .subscribe((movies: MovieCollection) => {
          this.movieSlider = movies.results;
        })
    );
  }
  getUpcomingMovies(): void {
    this.sliderTitle = 'Upcoming Movies';

    this.subscriptions.push(
      this.movieService.getCollectionMovies('upcoming', 1)
        .subscribe((movies: MovieCollection) => {
          this.movieSlider = movies.results;
        })
    );
  }

  getMovieDetails(movie: MovieFull) {
    this.uiService.getMovieDetails(movie.id);
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
