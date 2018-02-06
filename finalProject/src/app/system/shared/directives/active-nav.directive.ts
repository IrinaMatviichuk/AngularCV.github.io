import {
  Directive, ElementRef, HostListener, Renderer2, Output,
  EventEmitter, Input, OnInit, OnDestroy
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { UserEventsService } from '../servises/user-events.service';
import { UserContactBook } from '../models/user-contactbook';
import { CorrespondenceService } from '../servises/correspondence.service';

@Directive({
  selector: '[fpActiveNav]'
})
export class ActiveNavDirective implements OnInit, OnDestroy {
  private sub1: Subscription;
  private sub2: Subscription;
  private activeAddressee: UserContactBook;
  @Output() public userEvent = new EventEmitter();
  constructor(private element: ElementRef,
              private userEmits: UserEventsService,
              private correspondenceService: CorrespondenceService,
              private renderer: Renderer2) {
  }
@Input
('fpActiveNav') user: UserContactBook;
ngOnInit() {
  this.activeAddressee = this.correspondenceService.getActiveAddressee;
  if (this.activeAddressee) {
    this.userEmits.emitActiveContact(this.activeAddressee);
  }
  this.sub1 = this.userEmits.getActiveContact()
      .subscribe((data) => {
        this.userEvent.emit(data);
      });
  this.sub2 = this.userEmits.getResetActiveNav()
    .subscribe(() => {
      this.setStyle('background-color', 'transparent', 'img-frame');
    });
}
  @HostListener('userEvent', ['$event']) onActive(event) {
  if (+event.id === +this.user.id) {
      this.setStyle('background-color', '#a5c9e5', 'img-frame');
    } else {
      this.setStyle('background-color', 'transparent', 'img-frame');
    }
  }
  @HostListener('mouseenter') mouseEnter() {
    this.activeAddressee = this.correspondenceService.getActiveAddressee;
    if (this.activeAddressee) {
      this.userEmits.emitActiveContact(this.activeAddressee);
    }
    this.setStyle('background-color', '#d6cc32', 'img-frame');
  }
  @HostListener('mouseleave') mouseLeave() {
    this.setStyle('background-color', 'transparent', 'img-frame');
    this.activeAddressee = this.correspondenceService.getActiveAddressee;
    if (this.activeAddressee) {
      this.userEmits.emitActiveContact(this.activeAddressee);
    }
  }
  setStyle(style: string, value: string, exclusion?: string) {
    const { nativeElement } = this.element;
    const children = nativeElement.children;
    this.renderer.setStyle(nativeElement, style, value);
    for (let i = 0; i < children.length; i++) {
      if (!children[i].classList.contains(exclusion)) {
        this.renderer.setStyle(children[i], style, value);
      }
    }
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
