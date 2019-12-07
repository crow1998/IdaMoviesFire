import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isScrolled = new Subject<boolean>();
  searchEvent = new Subject();

  constructor(
    private snacbar: MatSnackBar,
    private router: Router) { }

  openSnackBar(message: string, actions: string, duration: number): void {
    this.snacbar.open(message, actions, { duration: duration });
  }

  getMovieDetails(movieId: number): void {
    this.router.navigate(['/movies/movie', movieId]);
  }

  getCastProfile(castId: number): void {
    this.router.navigate(['/cast', castId]);
  }

  disposeSubscriptions(subscriptions: Subscription[]) {
    subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
