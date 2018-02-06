import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseApiService } from '../../../shared/core/base-api.service';
import { Messange } from '../models/messange';
import { UserContactBook } from '../models/user-contactbook';
import { Contact } from '../models/contact';
import { UserEventsService } from './user-events.service';

@Injectable()
export class CorrespondenceService extends BaseApiService {
  private activeAddressee: UserContactBook;
  private activeCorrespondence: Messange[];
  private editMessage: Messange;
  private statusEditMessage: boolean;
  private statusEditContact: boolean;
  private currentContactBook: Contact;
  constructor(public http: HttpClient,
              public userEmits: UserEventsService) {
    super(http);
    this.statusEditMessage = false;
    this.statusEditContact = false;
  }
  pushMessage(message: Messange) {
    this.activeCorrespondence.push(message);
    this.userEmits.emitUpdateCorrespondence();
  }
  resetSelectMessage() {
    this.setEditMessage = null;
    this.setStatusEditMessage = false;
    this.userEmits.emitSelectMessange();
  }
  deleteSelectMessage(message: Messange) {
    this.activeCorrespondence = this.activeCorrespondence.filter(c => c.id !== message.id);
    this.resetSelectMessage();
    this.userEmits.emitUpdateCorrespondence();
  }
  set setStatusEditMessage(status: boolean) {
    this.statusEditMessage = status;
  }
  get getStatusEditMessage() {
    return this.statusEditMessage;
  }
  set setStatusEditContact(status: boolean) {
    this.statusEditContact = status;
  }
  get getStatusEditContact() {
    return this.statusEditContact;
  }
  set setEditMessage(message: Messange) {
    this.editMessage = message;
  }
  get getEditMessage() {
    return this.editMessage;
  }
  set setCurrentContactBook(contacts: Contact) {
    this.currentContactBook = contacts;
  }
  get getCurrentContactBook() {
    return this.currentContactBook;
  }
  set setActiveAddressee(user: UserContactBook) {
    this.activeAddressee = user;
  }
  get getActiveAddressee() {
    return this.activeAddressee;
  }
  set setActiveCorrespondence(correspondence: Messange[]) {
    this.activeCorrespondence = correspondence;
  }
  get getActiveCorrespondence() {
    return this.activeCorrespondence;
  }
  getMessange(id_sender: number, id_addressee: number): Observable<Messange[]> {
    return this.get(`messange?id_sender=${id_sender}&id_addressee=${id_addressee}`);
  }
  postMessange(message: Messange): Observable<any> {
    return this.post('messange', message);
  }
  deleteMessage(id: number) {
    return this.delete(`messange/${id}`);
  }
  putMessage(message: Messange, text: string): Observable<Messange> {
    message.text = text;
    return this.put(`messange/${message.id}`, message);
  }
  getContacts(id: number): Observable<Contact> {
    return this.get(`contacts?user_id=${id}`);
  }
  putContacts(contacts: Contact): Observable<Contact> {
    return this.put(`contacts/${contacts.id}`, contacts);
  }
}
