import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { UserContactBook } from '../../shared/models/user-contactbook';
import { LanguageService } from '../../../shared/servises/language/language.service';
import { Contact } from '../../shared/models/contact';
import { User } from '../../../shared/models/user';
import { Messange } from '../../shared/models/messange';
import { UserEventsService } from '../../shared/servises/user-events.service';
import { CorrespondenceService } from '../../shared/servises/correspondence.service';

@Component({
  selector: 'fp-active-contact',
  templateUrl: './active-contact.component.html',
  styleUrls: ['./active-contact.component.scss']
})
export class ActiveContactComponent implements OnInit, OnDestroy {
  private currentContactBook: UserContactBook[] = [];
  private currentUser: User;
  private currentUserId: number;
  private currentUserIdDB: number;
  private activeAddressee: UserContactBook;
  private currentCorrespondence: Messange[];
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private currentLanguage: string;
  private searchValue = '';
  private searchPlaceholder = 'dialog.withMessage';
  private searchField = 'date';

  constructor(private translate: LanguageService,
              private correspondenceService: CorrespondenceService,
              private userEmits: UserEventsService) {
    this.currentLanguage = this.translate.getLanguage;
    this.translate.checkLanguage(this.currentLanguage);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.sub1 = this.correspondenceService.getContacts(this.currentUser.id)
      .subscribe((userContacts: Contact) => {
        const currentUserContacts = userContacts[0] ? userContacts[0] : undefined;
        this.correspondenceService.setCurrentContactBook = currentUserContacts;
        this.currentUserId = +currentUserContacts.user_id;
        this.currentContactBook = currentUserContacts.contact_book;
        this.currentUserIdDB = +currentUserContacts.id;
      });
    this.sub2 = this.userEmits.getUpdateContactBook()
      .subscribe(() => {
        this.currentContactBook = this.correspondenceService.getCurrentContactBook.contact_book;
        this.activeAddressee = this.correspondenceService.getActiveAddressee;
        this.userEmits.emitActiveContact(this.activeAddressee);
      });
  }
  getContact(activeUser: UserContactBook) {
    this.activeAddressee = activeUser;
    this.sub3 = Observable.combineLatest(
      this.correspondenceService.getMessange(+this.currentUser.id, +this.activeAddressee['id']),
      this.correspondenceService.getMessange(+this.activeAddressee['id'], +this.currentUser.id)
    ).subscribe((data: [Messange[], Messange[]]) => {
      this.currentCorrespondence = [...data[0]];
      for (const value of data[1]) {
        this.currentCorrespondence.push(value);
      }
      this.correspondenceService.setActiveAddressee = this.activeAddressee;
      this.correspondenceService.setActiveCorrespondence = this.currentCorrespondence;
      this.userEmits.emitUpdateCorrespondence();
      this.userEmits.emitScrollBottom('scrollBottom');
    });
  }
  changeCriteria(criteria: string) {
    criteria === 'date' ? this.searchPlaceholder = 'dialog.withMessage' : this.searchPlaceholder = 'dialog.' + criteria;
    this.searchField = criteria;
    if (this.activeAddressee) {
      this.userEmits.emitActiveContact(this.activeAddressee);
    }
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
