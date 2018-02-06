import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserContactBook } from '../../shared/models/user-contactbook';
import { CorrespondenceService } from '../../shared/servises/correspondence.service';
import { UserEventsService } from '../../shared/servises/user-events.service';
import { LanguageService } from '../../../shared/servises/language/language.service';
import { User } from '../../../shared/models/user';
import { Contact } from '../../shared/models/contact';

@Component({
  selector: 'fp-list-phonebook',
  templateUrl: './list-phonebook.component.html',
  styleUrls: ['./list-phonebook.component.scss']
})
export class ListPhonebookComponent implements OnInit, OnDestroy {
  private contactBook: UserContactBook[] = [];
  private activeAddressee: UserContactBook;
  private currentLanguage: string;
  private currentUser: User;
  private currentUserContacts: Contact;
  private sub1: Subscription;
  private sub2: Subscription;
  constructor(private translate: LanguageService,
              private correspondenceService: CorrespondenceService,
              private userEmits: UserEventsService) {
    this.currentLanguage = this.translate.getLanguage;
    this.translate.checkLanguage(this.currentLanguage);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.sub1 = this.correspondenceService.getContacts(this.currentUser.id)
      .subscribe((userContacts: Contact) => {
        const currentUserContacts = userContacts[0] ? userContacts[0] : undefined;
        this.correspondenceService.setCurrentContactBook = currentUserContacts;
        this.contactBook = currentUserContacts.contact_book;
        this.currentUserContacts = currentUserContacts;
      });
    this.sub2 = this.userEmits.getUpdateContactBook()
      .subscribe(() => {
        this.contactBook = this.correspondenceService.getCurrentContactBook.contact_book;
        this.activeAddressee = this.correspondenceService.getActiveAddressee;
      });
  }
  editContact(activeUser: UserContactBook) {
    this.activeAddressee = activeUser;
    this.correspondenceService.setActiveAddressee = activeUser;
    this.correspondenceService.setStatusEditContact = true;
    this.userEmits.emitActiveContact(activeUser);
    this.userEmits.emitSelectContact();
  }
  deleteContact(activeUser: UserContactBook) {
    const index = this.currentUserContacts.contact_book.indexOf(activeUser);
    if (index !==  -1) {
      this.currentUserContacts.contact_book.splice(index, 1);
      this.correspondenceService.putContacts(this.currentUserContacts)
        .subscribe((contacts: Contact) => {
          this.correspondenceService.setCurrentContactBook = contacts;
          this.correspondenceService.setActiveAddressee = null;
          this.userEmits.emitUpdateContactBook();
        });
    }
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
