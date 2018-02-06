import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LanguageService } from '../../../shared/servises/language/language.service';
import { LANGUAGES } from '../../../shared/servises/language/language.constants';
import { CorrespondenceService } from '../../shared/servises/correspondence.service';
import { UserEventsService } from '../../shared/servises/user-events.service';
import { UserContactBook } from '../../shared/models/user-contactbook';
import { Contact } from '../../shared/models/contact';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'fp-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  private languages: string[] = [];
  private currentLanguage: string;
  private formContact: FormGroup;
  private edit: boolean;
  private currentUser: User;
  private contactForEdit: UserContactBook;
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  constructor(private translate: LanguageService,
              private correspondenceService: CorrespondenceService,
              private userEmits: UserEventsService) {
    this.currentLanguage = this.translate.getLanguage;
    this.translate.checkLanguage(this.currentLanguage);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.languages = LANGUAGES;
    this.formContact = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null),
      usersurname: new FormControl(null)
    });
    this.sub1 = this.userEmits.getSelectContact()
      .subscribe(() => {
        this.edit = this.correspondenceService.getStatusEditContact;
        this.contactForEdit = this.correspondenceService.getActiveAddressee;
        this.formContact.patchValue({
          email: this.contactForEdit.email,
          username: this.contactForEdit.username,
          usersurname: this.contactForEdit.usersurname
        });
      });
  }
  contactAdd() {
    const {email, username, usersurname} = this.formContact.value;
    const contactBook: Contact = this.correspondenceService.getCurrentContactBook;
    const newContact: UserContactBook = new UserContactBook(email, username, usersurname, '', this.findId(contactBook.contact_book));
    contactBook.contact_book.push(Object.assign({}, newContact));
    this.sub2 = this.correspondenceService.putContacts(contactBook)
      .subscribe((contacts: Contact) => {
        this.correspondenceService.setCurrentContactBook = contacts;
        this.userEmits.emitUpdateContactBook();
        this.formContact.reset();
      });
  }
  contactRefresh() {
    this.formContact.reset();
    this.sub3 = this.correspondenceService.getContacts(this.currentUser.id)
      .subscribe((userContacts: Contact) => {
        const currentUserContacts = userContacts[0] ? userContacts[0] : undefined;
        this.correspondenceService.setCurrentContactBook = currentUserContacts;
        this.correspondenceService.setActiveAddressee = null;
        this.edit = false;
        this.userEmits.emitResetActiveNav();
        this.userEmits.emitUpdateContactBook();
      });
  }
  contactEdit() {
    const {email, username, usersurname} = this.formContact.value;
    const contactBook: Contact = this.correspondenceService.getCurrentContactBook;
    const editAddressee = this.correspondenceService.getActiveAddressee;
    contactBook.contact_book.forEach((c) => {
      if (editAddressee.id === c.id) {
        c.email = email;
        c.username = username;
        c.usersurname = usersurname;
      }
    });
    this.sub2 = this.correspondenceService.putContacts(contactBook)
      .subscribe((contacts: Contact) => {
        this.correspondenceService.setCurrentContactBook = contacts;
        this.correspondenceService.setActiveAddressee = null;
        this.edit = false;
        this.userEmits.emitResetActiveNav();
        this.userEmits.emitUpdateContactBook();
        this.formContact.reset();
      });
  }
  contactFilter() {
    const {email, username, usersurname} = this.formContact.value;
    const contacts = this.correspondenceService.getCurrentContactBook;
    contacts.contact_book = contacts.contact_book
      .filter((e) => {
        if (email === null || email === '') {
          return true;
        }
        return e.email.toLowerCase().indexOf(email.toLowerCase()) !== -1;
      })
      .filter((e) => {
        if (username === null || username === '') {
          return true;
        }
        return e.username.toLowerCase().indexOf(username.toLowerCase()) !== -1;
      })
      .filter((e) => {
        if (usersurname === null || usersurname === '') {
          return true;
        }
        return e.usersurname.toLowerCase().indexOf(usersurname.toLowerCase()) !== -1;
      });
    this.correspondenceService.setCurrentContactBook = contacts;
    this.userEmits.emitUpdateContactBook();
  }
  findId(contactBook: UserContactBook[]): number {
    const sortContacts = contactBook.sort((first, second) => {
      if (first.id > second.id) {
        return 1;
      } else if (first.id < second.id) {
        return -1;
      } else {
        return 0;
      }
    });
    return sortContacts[sortContacts.length - 1].id + 1;
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
