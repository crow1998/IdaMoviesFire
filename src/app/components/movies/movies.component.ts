import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromRoot from '../../reducers/app.reducer';
import * as Movie from '../../reducers/actions/movie.actions';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private uiService: UiService) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        if (params['id']) {
          // this.resultType = params['id'];

          this.store.dispatch(new Movie.ResetResultType({
            provider: 'movie',
            data: params['id']
          }));

        }

      })
    );

  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
