import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { randFullName } from '@ngneat/falso';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: Profile[] = [];
  private searchResultsSubject: BehaviorSubject<Profile[]> =
    new BehaviorSubject(this.searchResults);

  constructor() {
    this.mockResults(15);
  }

  get searchResults$(): Observable<Profile[]> {
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
