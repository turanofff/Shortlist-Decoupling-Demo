import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { randFullName } from '@ngneat/falso';
import { SearchResultsItem } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: SearchResultsItem[] = [];
  private searchResultsSubject: BehaviorSubject<SearchResultsItem[]> =
    new BehaviorSubject(this.searchResults);

  constructor() {
    this.mockResults(15);
  }

  get searchResults$(): Observable<SearchResultsItem[]> {
    return this.searchResultsSubject.asObservable();
  }

  private mockResults(count: number): void {
    const searchResultsCount = this.searchResults.length;
    for (let i = searchResultsCount + 1; i <= searchResultsCount + count; i++) {
      this.searchResults.push({
        profileId: i,
        name: randFullName(),
        shortlisted: false,
      });
    }
  }

  public pushMoreResults(): void {
    this.mockResults(5);
    this.searchResultsSubject.next(this.searchResults);
  }
}
