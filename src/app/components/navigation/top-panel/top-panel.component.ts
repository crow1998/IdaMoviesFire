import { ChangeTheme } from './../../../reducers/actions/ui.actions';
import { Store } from '@ngrx/store';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import { UserForRegister } from 'src/app/models/UserForRegister.model';
import { UserFull } from 'src/app/models/movies/UserFull.model';
import { Subscription, Observable } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit, OnDestroy {

  @Output() toggleSideNav = new EventEmitter();
  isAuth: boolean;
  profilePhotoUrl = '';
  user: UserForRegister;
  subscriptions: Subscription[] = [];
  isUserChecked$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private uiService: UiService) { }

  ngOnInit() {

    this.isUserChecked$ = this.store.select(fromRoot.getIsUserChecked);

    this.subscriptions.push(
      this.store.select(fromRoot.getIsAuthenticated).subscribe(isAuth => {
        this.isAuth = isAuth;

      })
    );
    this.subscriptions.push(
      this.store.select(fromRoot.getUserFull).subscribe((userFull: UserFull) => {
        this.user = userFull.uProfile;
        this.profilePhotoUrl = userFull.profilePhotoUrl;
      })
    );

  }

  changeTheme(theme: string): void {

    localStorage.setItem('theme', theme);
    this.store.dispatch(new UI.ChangeTheme(theme));
  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }
}
