import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as fromRoot from '../../reducers/app.reducer';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/services/ui.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, OnDestroy {

  isAuth = false;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private uiService: UiService,
    private afAuth: AngularFireAuth) {

    this.subscriptions.push(
      this.store.select(fromRoot.getIsAuthenticated).subscribe(isAuth => {
        this.isAuth = isAuth;
      })
    );
  }

  canActivate(): boolean {

    if (!this.isAuth) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
