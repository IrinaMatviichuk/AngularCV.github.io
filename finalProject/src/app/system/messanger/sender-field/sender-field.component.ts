import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { LanguageService } from '../../../shared/servises/language/language.service';
import { UserContactBook } from '../../shared/models/user-contactbook';
import { Messange } from '../../shared/models/messange';
import { User } from '../../../shared/models/user';
import { CorrespondenceService } from '../../shared/servises/correspondence.service';
import { MessageChat } from '../../shared/chat/chat.model';
import { ChatService } from '../../shared/chat/chat.service';
import { UserEventsService } from '../../shared/servises/user-events.service';
import { Contact } from '../../shared/models/contact';

@Component({
  selector: 'fp-sender-field',
  templateUrl: './sender-field.component.html',
  styleUrls: ['./sender-field.component.scss']
})
export class SenderFieldComponent implements OnInit, OnDestroy {
  private currentLanguage: string;
  private message: string;
  private correspondence: Messange[];
  private user: User;
  private addressee: UserContactBook;
  private activeField: boolean;
  private statusEditMessage: boolean;
  private messageForEdit: Messange;
  private edit: boolean;
  private sub1: Subscription;
  private sub2: Subscription;
  constructor(private translate: LanguageService,
              private correspondenceService: CorrespondenceService,
              private chat: ChatService,
              private userEmits: UserEventsService) {
    this.currentLanguage = this.translate.getLanguage;
    this.translate.checkLanguage(this.currentLanguage);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.activeField = false;
    chat.message.subscribe(ms => {
      if (ms.name === 'noName') {
        this.addNewMassegeDB(this.addressee.id, this.user.id, ms.message);
      }
    });
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.sub1 = this.userEmits.getCorrespondenceData()
      .subscribe(() => {
        this.addressee = this.correspondenceService.getActiveAddressee;
        this.correspondence = this.correspondenceService.getActiveCorrespondence;
        this.activeField = true;
        this.message = '';
        this.statusEditMessage = false;
        this.edit = true;
      });
    this.sub2 = this.userEmits.getSelectMessange()
      .subscribe(() => {
        this.statusEditMessage = this.correspondenceService.getStatusEditMessage;
        this.messageForEdit = this.correspondenceService.getEditMessage;
      });
  }
  sendMessage() {
    this.addNewMassegeDB(this.user.id, this.addressee.id, this.message);
    this.sendMessageChat(this.user.username, this.message);
    this.message = '';
  }
  addNewMassegeDB(id_sender: number, id_adressee: number, text: string) {
    const msgDate = moment().format('YYYY-MM-DD HH:mm');
    const addMessage = new Messange(id_sender, id_adressee, msgDate, text, 'active');
    this.correspondenceService.postMessange(addMessage)
      .subscribe((data) => {
        if (data.status === 201) {
          this.correspondenceService.pushMessage(data.body);
          this.correspondence = this.correspondenceService.getActiveCorrespondence;
          this.userEmits.emitScrollBottom('scrollBottom');
          this.correspondenceService.getContacts(this.user.id)
            .subscribe((userContacts: Contact) => {
              const currentUserContacts = userContacts[0] ? userContacts[0] : undefined;
              currentUserContacts.contact_book.forEach((e) => {
                if (this.addressee.id === e.id) {
                  e.date = msgDate;
                }
              });
              this.correspondenceService.putContacts(currentUserContacts)
                .subscribe((contacts: Contact) => {
                  this.correspondenceService.setCurrentContactBook = contacts;
                  this.addressee.date = msgDate;
                  this.correspondenceService.setActiveAddressee = this.addressee;
                  this.userEmits.emitUpdateContactBook();
              });
            });
          }
      });
  }
  addNewLine() {
    this.message = this.message + '\r\n';
  }
  deleteMassege() {
    this.correspondenceService.deleteMessage(this.messageForEdit.id)
      .subscribe(() => {
        this.correspondenceService.deleteSelectMessage(this.messageForEdit);
      });
  }
  editMassege() {
    this.edit = false;
    this.message = this.messageForEdit.text;
  }
  saveMassege() {
    this.correspondenceService.putMessage(this.messageForEdit, this.message)
      .subscribe((data) => {
        this.correspondenceService.resetSelectMessage();
        this.userEmits.emitUpdateCorrespondence();
      });
  }
  cancelEditMassege() {
    this.userEmits.emitUpdateCorrespondence();
  }
  sendMessageChat(name: string, msg: string): void {
    this.chat.sendMessage(new MessageChat(name, msg));
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
