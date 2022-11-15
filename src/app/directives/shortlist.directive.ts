import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { ShortlistService } from '../services/shortlist.service';

@Directive({
  selector: '[appShortlist]',
})
export class ShortlistDirective {
  @Input() profileId: number;
  @Input() shortlisted: boolean;

  private shortlistButton = this.document.createElement('button');

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private shortlistService: ShortlistService
  ) {}

  private addToShortlist(id: number): void {
    this.shortlistService.addToShortlist(id);
  }

  private removeFromShortlist(id: number): void {
    this.shortlistService.removeFromShortlist(id);
  }

  @HostListener('click') onClick() {
    if (this.shortlisted) {
      this.shortlistButton.innerHTML = 'add';
      this.removeFromShortlist(this.profileId);
    } else {
      this.shortlistButton.innerHTML = 'remove';
      this.addToShortlist(this.profileId);
    }
  }

  ngAfterViewInit() {
    this.shortlistButton.innerHTML = this.shortlisted ? 'remove' : 'add';
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.shortlistButton
    );
  }
}
