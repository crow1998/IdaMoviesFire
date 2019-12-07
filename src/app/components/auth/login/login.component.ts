import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passHide = true;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    setTimeout(() => {
      this.store.dispatch(new UI.StopLoading());
    }, 100);

  }

  onFormSubmit(form: NgForm): void {
    this.store.dispatch(new UI.StartLoading());

    this.authService.login(form.value);
  }

}
