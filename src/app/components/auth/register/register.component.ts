import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passHide = true;
  isLoading$: Observable<boolean>;
  maxDate: Date;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 15);

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    setTimeout(() => {
      this.store.dispatch(new UI.StopLoading());
    }, 100);

  }

  onFormSubmit(form: NgForm, photo: any): void {
    this.store.dispatch(new UI.StartLoading());

    let photoType = null;

    if (photo) {
      const lastIndex = photo.name.lastIndexOf('.');
      photoType = photo.name.substr(lastIndex);
    }

    this.authService.register(form.value, photo, photoType);
  }

}
