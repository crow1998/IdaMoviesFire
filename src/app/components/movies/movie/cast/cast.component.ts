import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit, OnDestroy {

  movieId: number;
  cast = [];
  posterUrl: string;
  subscriptions: Subscription[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private uiService: UiService) { }

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
      },
      900: {
        items: 7,
        slideBy: 7
      }
    },
    nav: true
  };

  ngOnInit() {

    this.posterUrl = this.movieService.posterUrl;

    this.subscriptions.push(
      this.route.params.subscribe(params => {

        this.movieId = params['id'];
      })
    );

    this.subscriptions.push(
      this.movieService.getCast(this.movieId).subscribe(castFull => {

        this.cast = castFull.cast;
      })
    );

  }



  getCastProfile(castId: number): void {
    this.uiService.getCastProfile(castId);
  }
  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
