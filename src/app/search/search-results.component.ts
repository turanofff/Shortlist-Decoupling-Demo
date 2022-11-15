import { Component } from '@angular/core';
import {
  combineLatest,
  Observable,
  timeout,
  catchError,
  of,
  throwError,
  pipe,
} from 'rxjs';
import { Profile } from '../models/profile.model';
import { SearchService } from '../services/search.service';
import { ShortlistService } from '../services/shortlist.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResults {
  private apiTimeout = 20 * 1000; // Setting timeout to 20s as an example.
  private timeoutAndErrorHandlingPipe = (
    apiCallName: string,
    defaultReturnValue: any
  ) =>
    pipe(
      timeout({
        first: this.apiTimeout, // Times out only first value emitted from observable.
        with: () => throwError(() => new Error('API has timed out')), // Throws timeout error.
      }),
      catchError((error) => {
        // Handles all erros including timeout.
        console.error(`${apiCallName} call returned error`, error);
        return of(defaultReturnValue);
      })
    );
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
      this.timeoutAndErrorHandlingPipe('Search', [])
    ) as Observable<Profile[]>;
    this.shortlist$ = this.shortlistService.shortlist$.pipe(
      this.timeoutAndErrorHandlingPipe('Shortlist', new Set())
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
