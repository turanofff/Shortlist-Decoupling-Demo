import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ShortlistService } from '../services/shortlist.service';

@Directive({
  selector: '[appShortlist]',
})
export class ShortlistDirective {
  @Input() profile: Profile;

  private shortlistButton = this.document.createElement('button');

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private shortlistService: ShortlistService
  ) {}

  private addToShortlist(profileId: number): void {
    this.shortlistService.addToShortlist(profileId);
  }

  private removeFromShortlist(profileId: number): void {
    this.shortlistService.removeFromShortlist(profileId);
  }

  private configureShortlistButton(isShortlisted: boolean): void {
    if (isShortlisted) {
      this.shortlistButton.innerHTML = 'remove';
      this.shortlistButton.classList.add('button-shortlisted');
    } else {
      this.shortlistButton.innerHTML = 'add';
      this.shortlistButton.classList.remove('button-shortlisted');
    }
  }

  private toggleShortlistedItem(): void {
    if (this.profile?.shortlisted) {
      this.configureShortlistButton(false);
      this.removeFromShortlist(this.profile?.profileId);
    } else {
      this.configureShortlistButton(true);
      this.addToShortlist(this.profile?.profileId);
    }
  }

  ngAfterViewInit() {
    this.configureShortlistButton(this.profile?.shortlisted);
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.shortlistButton
    );
    this.renderer.listen(this.shortlistButton, 'click', () =>
      this.toggleShortlistedItem()
    );
  }
}
