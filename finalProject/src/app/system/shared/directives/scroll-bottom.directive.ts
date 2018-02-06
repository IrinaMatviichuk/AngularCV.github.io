import { Directive, ElementRef, EventEmitter, HostListener, DoCheck, OnInit, Output, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserEventsService } from '../servises/user-events.service';

@Directive({
  selector: '[fpScrollBottom]'
})
export class ScrollBottomDirective implements OnInit, DoCheck {
  private sub: Subscription;
  private scroll: boolean;
  private scrollHeight: number;
  constructor(private element: ElementRef,
              private userEmits: UserEventsService,
              private renderer: Renderer2) {
  }
  @Output() public userEvent = new EventEmitter();
  ngOnInit() {
    this.scroll = false;
    this.scrollHeight = this.element.nativeElement.scrollHeight;
    this.renderer.setProperty(this.element.nativeElement, 'scrollTop', this.scrollHeight);
    if (this.userEmits.getScrollLabel === 'scrollBottom') {
      this.userEvent.emit();
    }
    this.sub = this.userEmits.getScrollBottom()
      .subscribe((data) => {
        if (this.userEmits.getScrollLabel === 'scrollBottom') {
          this.userEvent.emit();
        }
      });
  }
  @HostListener('userEvent', ['$event']) onScrollBottom() {
    this.scroll = true;
    this.scrollHeight = this.element.nativeElement.scrollHeight;
  }
  ngDoCheck() {
    if (this.scrollHeight < this.element.nativeElement.scrollHeight) {
      this.scrollHeight = this.element.nativeElement.scrollHeight;
      if (this.scroll) {
        this.renderer.setProperty(this.element.nativeElement, 'scrollTop', this.scrollHeight);
        this.scroll = false;
      }
    }
  }
}
