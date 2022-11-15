import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortlistService {
  private shortlistedProfiles: Set<number> = new Set<number>([
    1, 5, 10, 16, 20,
  ]);

  private shortlistSubject: BehaviorSubject<Set<number>> = new BehaviorSubject(
    this.shortlistedProfiles
  );

  get shortlist$(): Observable<Set<number>> {
    // Uncomment this line if you want to see error handling in action
    // return throwError(() => new Error('Unable to complete api call'));
    return this.shortlistSubject.asObservable();
  }

  public addToShortlist(profileId: number): void {
    this.shortlistedProfiles.add(profileId);
    this.shortlistSubject.next(this.shortlistedProfiles);
  }

  public removeFromShortlist(profileId: number): void {
    this.shortlistedProfiles.delete(profileId);
    this.shortlistSubject.next(this.shortlistedProfiles);
  }
}
