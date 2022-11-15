import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Profile } from '../../shared/models/profile.model';
import { SearchService } from '../../shared/services/search.service';
import { ShortlistService } from '../../shared/services/shortlist.service';
import { ErrorAndTimeoutPipe } from '../../shared/utlility/error-and-timeout.pipe';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResults {
  private searchResults$: Observable<Profile[]>;
  private shortlist$: Observable<Set<number>>;
  public mergedResults$: Observable<Profile[]>;

  constructor(
    private searchService: SearchService,
    private shortlistService: ShortlistService
  ) {
    // Here we have two observables coming from the different services.
    // We also do have timeout and error handling should real api call fail.
    this.searchResults$ = this.searchService.searchResults$.pipe(
      ErrorAndTimeoutPipe('Search', [])
    ) as Observable<Profile[]>;
    this.shortlist$ = this.shortlistService.shortlist$.pipe(
      ErrorAndTimeoutPipe('Shortlist', new Set())
    ) as Observable<Set<number>>;

    // This is how we combine latest emitted values from observables and updating shortlist status.
    this.mergedResults$ = combineLatest(
      [this.searchResults$, this.shortlist$],
      (searchResults, shortlist) => {
        return searchResults.map((searchResultsItem) => {
          searchResultsItem.shortlisted = shortlist.has(
            searchResultsItem.profileId
          );
          return searchResultsItem;
        });
      }
    );
  }

  public pushMore(): void {
    this.searchService.pushMoreResults();
  }
}
