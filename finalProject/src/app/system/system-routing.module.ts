import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { MessangerComponent } from './messanger/messanger.component';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { AuthGuard } from '../shared/servises/auth/auth.guard';

const systemRoutes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'messanger', component: MessangerComponent},
      {path: 'phonebook', component: PhonebookComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(systemRoutes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
