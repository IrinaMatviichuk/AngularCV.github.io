import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './shared/component/header/header.component';
import { SystemComponent } from './system.component';
import { MessangerComponent } from './messanger/messanger.component';
import { SharedModule } from '../shared/shared.module';
import { ActiveContactComponent } from './messanger/active-contact/active-contact.component';
import { CorrespondenceFieldComponent } from './messanger/correspondence-field/correspondence-field.component';
import { CorrespondenceService } from './shared/servises/correspondence.service';
import { SenderFieldComponent } from './messanger/sender-field/sender-field.component';
import { ChatService } from './shared/chat/chat.service';
import { SortPipe } from './shared/pipe/sort.pipe';
import { ScrollBottomDirective } from './shared/directives/scroll-bottom.directive';
import { UserEventsService } from './shared/servises/user-events.service';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { SearchPipe } from './shared/pipe/search.pipe';
import { ActiveNavDirective } from './shared/directives/active-nav.directive';
import { ListPhonebookComponent } from './phonebook/list-phonebook/list-phonebook.component';
import { ControlPanelComponent } from './phonebook/control-panel/control-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  declarations: [
    SystemComponent,
    MessangerComponent,
    HeaderComponent,
    ActiveContactComponent,
    CorrespondenceFieldComponent,
    SenderFieldComponent,
    SortPipe,
    ScrollBottomDirective,
    PhonebookComponent,
    DropdownDirective,
    SearchPipe,
    ActiveNavDirective,
    ListPhonebookComponent,
    ControlPanelComponent
  ],
  providers: [
    CorrespondenceService,
    ChatService,
    UserEventsService
  ]
})
export class SystemModule { }
