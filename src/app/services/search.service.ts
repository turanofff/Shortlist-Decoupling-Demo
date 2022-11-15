import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { randFullName } from '@ngneat/falso';
import { SearchResultsItem } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  get searchResults$(): Observable<SearchResultsItem[]> {
    const mockedResults = [];
    for (let i = 1; i <= 25; i++) {
      mockedResults.push({
        profileId: i,
        name: randFullName(),
        shortlisted: false,
      });
    }
    return of(mockedResults);
  }
}
