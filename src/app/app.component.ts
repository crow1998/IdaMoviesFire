import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from './reducers/app.reducer';
import * as UI from './reducers/actions/ui.actions';
import { Store } from '@ngrx/store';
import { Router, NavigationStart } from '@angular/router';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'IDa-Movies';
  isLoading$: Observable<boolean>;
  theme$: Observable<string>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private uiService: UiService,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
    this.authService.checkUserOnLoad();

    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.store.dispatch(new UI.StartLoading());
        }
      })
    );

    if (localStorage.getItem('theme')) {
      this.store.dispatch(new UI.ChangeTheme(localStorage.getItem('theme')));
    }

    this.theme$ = this.store.select(fromRoot.getTheme);

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  fireScroll(event) {
    if ((event.target.offsetHeight + event.target.scrollTop) > (event.target.scrollHeight - 1)) {

      this.uiService.isScrolled.next(true);
    }
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
