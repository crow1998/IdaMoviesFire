import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Form } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { Search } from 'src/app/models/movies/Search.model';
import * as fromRoot from '../../../../reducers/app.reducer';
import * as Movie from '../../../../reducers/actions/movie.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

  searchForm: Search;
  @ViewChild('searchInput') searchInput: ElementRef;
  subscriptions: Subscription[] = [];

  constructor(
    private uiService: UiService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(fromRoot.getSearchParams).subscribe(searchParams => {
        if (!searchParams.isSearched) {
          this.searchInput.nativeElement.value = '';
        }

      })
    );
  }

  onSearch(form) {

    this.searchForm = {
      isSearched: true,
      searchForm: {
        keywords: form.value.keywords
      }
    };

    this.store.dispatch(new Movie.PopulateSearch(this.searchForm));

    // this.uiService.searchEvent.next(this.searchForm);
  }
  ngOnDestroy(): void {
    this.uiService.disposeSubscriptions(this.subscriptions);
  }

}
