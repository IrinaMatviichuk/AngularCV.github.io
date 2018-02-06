import { EventEmitter, Injectable } from '@angular/core';

import { UserContactBook } from '../models/user-contactbook';

@Injectable()
export class UserEventsService {
  private scrollLabel: string;
  public scrollBottom = new EventEmitter();
  public activeContact = new EventEmitter();
  public selectMessage = new EventEmitter<any>();
  public selectContact = new EventEmitter<any>();
  public updateContactBook = new EventEmitter<any>();
  public updateCorrespondence = new EventEmitter<any>();
  public resetActiveNav = new EventEmitter<any>();
  constructor() {
    this.scrollLabel = 'none';
  }
  get getScrollLabel() {
    return this.scrollLabel;
  }
  emitScrollBottom(value?: string) {
    this.scrollLabel = value;
    this.scrollBottom.emit();
  }
  getScrollBottom() {
    return this.scrollBottom;
  }
  emitActiveContact(activeUser: UserContactBook) {
    this.activeContact.emit(activeUser);
  }
  getActiveContact() {
    return this.activeContact;
  }
  emitUpdateContactBook() {
    this.updateContactBook.emit();
  }
  getUpdateContactBook() {
    return this.updateContactBook;
  }
  emitSelectMessange() {
    this.selectMessage.emit();
  }
  getSelectMessange() {
    return this.selectMessage;
  }
  emitUpdateCorrespondence() {
    this.updateCorrespondence.emit();
  }
  getCorrespondenceData() {
    return this.updateCorrespondence;
  }
  emitSelectContact() {
    this.selectContact.emit();
  }
  getSelectContact() {
    return this.selectContact;
  }
  emitResetActiveNav() {
    this.resetActiveNav.emit();
  }
  getResetActiveNav() {
    return this.resetActiveNav;
  }
}
