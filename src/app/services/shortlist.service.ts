import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

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
