import { Subscription, Observable } from 'rxjs';
import { UserForRegister } from './../../../models/UserForRegister.model';
import { Store } from '@ngrx/store';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import { UserFull } from 'src/app/models/movies/UserFull.model';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  profilePhotoUrl = '';
  user: UserForRegister;
  subscriptions: Subscription[] = [];
  isUserChecked$: Observable<boolean>;

  @Output() closeSideNav = new EventEmitter();

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
    this.onCloseSideNav();
  }

  onCloseSideNav(): void {
    this.closeSideNav.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onCloseSideNav();
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
