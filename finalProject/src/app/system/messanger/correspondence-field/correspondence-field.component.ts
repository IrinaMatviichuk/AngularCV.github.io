import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Messange } from '../../shared/models/messange';
import { UserContactBook } from '../../shared/models/user-contactbook';
import { User} from '../../../shared/models/user';
import { CorrespondenceService } from '../../shared/servises/correspondence.service';
import {UserEventsService} from '../../shared/servises/user-events.service';

@Component({
  selector: 'fp-correspondence-field',
  templateUrl: './correspondence-field.component.html',
  styleUrls: ['./correspondence-field.component.scss']
})
export class CorrespondenceFieldComponent implements OnInit, OnDestroy {
  private correspondence: Messange[];
  private user: User;
  private addressee: UserContactBook;
  private checkId: number;
  private sub: Subscription;
  constructor(private correspondenceService: CorrespondenceService,
              private userEmits: UserEventsService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.sub = this.userEmits.getCorrespondenceData()
      .subscribe(() => {
        this.addressee = this.correspondenceService.getActiveAddressee;
        this.correspondence = this.correspondenceService.getActiveCorrespondence;
        if (this.checkId) {
          this.correspondenceService.resetSelectMessage();
          this.checkId = null;
        }
        this.userEmits.emitActiveContact(this.addressee);
      });
  }
  checkMassege(message: Messange) {
    if (message.id_sender === this.user.id) {
      this.correspondenceService.setEditMessage = message;
      this.correspondenceService.setStatusEditMessage = true;
      this.userEmits.emitSelectMessange();
      this.checkId = message.id;
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
