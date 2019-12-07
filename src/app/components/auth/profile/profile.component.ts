import { UserFull } from 'src/app/models/movies/UserFull.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromRoot from '../../../reducers/app.reducer';
import * as UI from '../../../reducers/actions/ui.actions';
import { UserForRegister } from 'src/app/models/UserForRegister.model';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: UserForRegister;
  profilePhotoUrl: string;
  subscriptions: Subscription[] = [];
  newProfilePhotoUrl: any;

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private uiService: UiService) { }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new UI.StopLoading());
    }, 100);

    this.subscriptions.push(
      this.store.select(fromRoot.getUserFull).subscribe((userFull: UserFull) => {
        this.user = userFull.uProfile;
        this.profilePhotoUrl = userFull.profilePhotoUrl;
      })
    );

  }

  onPhotoChange(photo: any): void {
    const photoReader = new FileReader();

    photoReader.onloadend = () => {
      this.newProfilePhotoUrl = photoReader.result;
    };

    if (photo) {
      photoReader.readAsDataURL(photo);
    }

  }

  onFormSubmit(form: NgForm, photo: any): void {
    // this.store.dispatch(new UI.StartLoading());

    let photoType = null;

    if (photo) {
      const lastIndex = photo.name.lastIndexOf('.');
      photoType = photo.name.substr(lastIndex);
    }

    this.authService.resetInformation(photo, form.value.Password);
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
