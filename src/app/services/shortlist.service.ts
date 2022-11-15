import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortlistService {
  private shortlistedProfiles: Set<number> = new Set<number>([1, 5, 10]);

  private shortlistSubject: BehaviorSubject<Set<number>> = new BehaviorSubject(
    this.shortlistedProfiles
  );

  get shortlist$(): Observable<Set<number>> {
    return this.shortlistSubject.asObservable();
  }

  public addToShortlist(id: number): void {
    this.shortlistedProfiles.add(id);
    this.shortlistSubject.next(this.shortlistedProfiles);
  }

  public removeFromShortlist(id: number): void {
    this.shortlistedProfiles.delete(id);
    this.shortlistSubject.next(this.shortlistedProfiles);
  }

  public isShortlisted(id: number): boolean {
    return this.shortlistedProfiles.has(id);
  }
}
