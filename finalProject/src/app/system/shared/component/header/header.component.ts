import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LanguageService } from '../../../../shared/servises/language/language.service';
import { AuthService } from '../../../../shared/servises/auth/auth.service';
import { Contact } from '../../models/contact';
import { CorrespondenceService } from '../../servises/correspondence.service';
import { UserEventsService } from '../../servises/user-events.service';

@Component({
  selector: 'fp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() surname: string;
  private currentLanguage: string;
  private typeApp: boolean;
  private sub1: Subscription;
  private sub2: Subscription;
  constructor(private translate: LanguageService,
              private authService: AuthService,
              private correspondenceService: CorrespondenceService,
              private userEmits: UserEventsService,
              private router: Router) {
    this.currentLanguage = this.translate.getLanguage;
    this.translate.checkLanguage(this.currentLanguage);
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.router.url === '/phonebook' ? this.typeApp = false : this.typeApp = true;
  }
  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  messanger() {
    this.router.navigate(['/messanger']);
    this.typeApp = !this.typeApp;
    this.updateContact();
  }
  phonebook() {
    this.router.navigate(['/phonebook']);
    this.typeApp = !this.typeApp;
    this.updateContact();
  }
  updateContact() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sub2 = this.correspondenceService.getContacts(currentUser.id)
      .subscribe((userContacts: Contact) => {
        const currentUserContacts = userContacts[0] ? userContacts[0] : undefined;
        this.correspondenceService.setCurrentContactBook = currentUserContacts;
        this.correspondenceService.setActiveAddressee = null;
        this.userEmits.emitUpdateContactBook();
      });
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
