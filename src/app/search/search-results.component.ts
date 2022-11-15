import { Component } from '@angular/core';
import { combineLatest, map, Observable, switchMap, tap, zip } from 'rxjs';
import { SearchResultsItem } from '../models/search-result.model';
import { SearchService } from '../services/search.service';
import { ShortlistService } from '../services/shortlist.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResults {
  private searchResults$: Observable<SearchResultsItem[]>;
  private shortlist$: Observable<Set<number>>;
  public mergedResult$: Observable<SearchResultsItem[]>;

  constructor(
    private searchService: SearchService,
    private shortlistService: ShortlistService
  ) {
    // Here we have two observables coming from the different services.
    this.searchResults$ = this.searchService.searchResults$;
    this.shortlist$ = this.shortlistService.shortlist$;

    // This is how we combine latest emitted values from observables and updating shortlist status.
    this.mergedResult$ = combineLatest(
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
