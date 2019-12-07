import { MovieFull } from './../models/movies/movies_full/MovieFull.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { UiService } from './ui.service';
import { UserForLogin } from '../models/UserForLogin.model';
import { UserForRegister } from '../models/UserForRegister.model';
import * as fromRoot from '../reducers/app.reducer';
import * as UI from '../reducers/actions/ui.actions';
import * as Auth from '../reducers/actions/auth.actions';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserFull } from '../models/movies/UserFull.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  curUserId: string;
  userFull: UserFull;
  subscriptions: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private uiService: UiService,
    private db: AngularFirestore,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getUserFull).subscribe(userFull => {
      this.userFull = userFull;
    });
  }


  checkUserOnLoad(): void {
    this.afAuth.auth.onAuthStateChanged(state => {
      if (state) {
        this.curUserId = state.uid;
        this.handleAuth(true);
      }
      this.store.dispatch(new UI.UserChecked(true));
    }, err => {
      this.store.dispatch(new UI.UserChecked(true));
    });
  }

  getUser(): void {

    this.db.collection('users')
      .doc(this.curUserId)
      .valueChanges()
      .subscribe((res: UserFull) => {
        if (this.userFull.uId) {
          this.store.dispatch(new Auth.PopulateUser(
            {
              ...this.userFull,
              uData: res.uData
            }
          ));
        } else {

          this.store.dispatch(new Auth.PopulateUser(
            {
              uData: res.uData,
              uId: res.uId,
              uProfile: res.uProfile
            }
          ));
          this.getUserProfilePhoto();
        }

      }, err => {

      });

  }

  getUserProfilePhoto(): void {
    const photoPath = this.userFull.uProfile.ProfilePath;

    if (photoPath) {

      this.subscriptions.push(
        this.afStorage.ref(`users/${this.curUserId}/${photoPath}`)
          .getDownloadURL().subscribe(url => {

            this.store.dispatch(new Auth.PopulateUser(
              {
                ...this.userFull,
                profilePhotoUrl: url
              }
            ));
          })
      );
    } else {

      this.store.dispatch(new Auth.PopulateUser(
        {
          ...this.userFull,
          profilePhotoUrl: ''
        }
      ));
    }
  }

  login(user: UserForLogin): void {

    this.afAuth.auth.signInWithEmailAndPassword(user.Email, user.Password)
      .then(res => {

        this.curUserId = res.user.uid;
        this.handleAuth(true);
      })
      .catch(err => {
        this.displayError(err);
      });
  }

  register(user: UserForRegister, photo: any, photoType: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(user.Email, user.Password)
      .then(res => {
        let randomId = null;

        if (photo) {
          randomId = Math.random().toString(36).substring(2);
          this.populatePhotoInStorage(res.user.uid, randomId, photo);
        }

        this.populateUserInStore(user, res.user.uid, randomId, [], false);

      }).catch(err => {
        this.displayError(err);
      });
  }

  populatePhotoInStorage(userId: string, profilePhotoId: string, photo: any): void {
    this.afStorage.ref(`users/${userId}/${profilePhotoId}`).put(photo)
      .then(result => {

      })
      .catch(err => {
      });
  }

  deletePhotoFromStorage(userId: string, profilePhotoId: string): void {
    this.subscriptions.push(
      this.afStorage.ref(`users/${userId}/${profilePhotoId}`).delete()
        .subscribe(res => {
        })
    );
  }

  populateUserInStore(user: UserForRegister, userId: string, profilePhotoId: string, watchList: MovieFull[], updateUser: boolean): void {
    this.db.collection('users').doc(userId).set({
      uId: userId,
      uProfile: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        BirthDate: user.BirthDate,
        ProfilePath: `${profilePhotoId}`
      },
      uData: {
        watchList: watchList
      }
    }).then(resul => {

      if (!updateUser) {
        this.login(user);
      }

    }).catch(err => {
      this.displayError(err);
    });
  }

  displayError(error: Error): void {
    this.store.dispatch(new UI.StopLoading());
    this.uiService.openSnackBar(error.message, null, 2000);
  }

  resetInformation(photo: any, password: string): void {
    // this.afAuth.auth.currentUser.

    if (password.length || photo) {

      if (password.length) {
        this.afAuth.auth.currentUser.updatePassword(password)
          .then(res => {

          })
          .catch(err => {

          });
      }
      if (photo) {
        const randomId = Math.random().toString(36).substring(2);

        if (this.userFull.uProfile.ProfilePath) {

          this.deletePhotoFromStorage(this.userFull.uId, this.userFull.uProfile.ProfilePath);
        }
        this.populatePhotoInStorage(this.userFull.uId, randomId, photo);
        this.populateUserInStore(this.userFull.uProfile, this.userFull.uId, randomId, this.userFull.uData.watchList, true);
      }

      this.uiService.openSnackBar('Personal Information Updated Successfully', null, 1500);

      setTimeout(() => {
        this.logout();
      }, 1500);
    }
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.handleAuth(false);
    this.store.dispatch(new Auth.EmptyUser());
  }

  private handleAuth(isAuth: boolean): void {
    if (isAuth) {
      this.store.dispatch(new Auth.IsAuthenticated());
      this.getUser();

      if (this.router.url === '/login' || this.router.url === '/register') {
        this.router.navigate(['/']);
      }
    } else {
      this.store.dispatch(new Auth.NotAuthenticated());
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
