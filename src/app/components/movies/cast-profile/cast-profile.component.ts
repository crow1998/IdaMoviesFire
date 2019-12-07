import { Observable, Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cast } from 'src/app/models/Cast.model';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import * as Movie from '../../../reducers/actions/movie.actions';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cast-profile',
  templateUrl: './cast-profile.component.html',
  styleUrls: ['./cast-profile.component.scss']
})
export class CastProfileComponent implements OnInit, OnDestroy {

  castId: number;
  castProfile: Cast;
  isLoading$: Observable<boolean>;
  posterUrl = '';
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private store: Store<fromRoot.State>,
    private uiService: UiService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.castId = params['id'];

        this.store.dispatch(new Movie.ResetResultType({
          provider: 'cast',
          data: params['id']
        }));

        this.onComponentInit();
      })
    );

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.posterUrl = this.movieService.posterUrl;
  }

  onComponentInit(): void {
    this.subscriptions.push(
      this.movieService.getCastDetails(this.castId).subscribe((castProfile: Cast) => {
        this.castProfile = castProfile;
        this.store.dispatch(new UI.StopLoading());

      })
    );
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
