import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user';

@Component({
  selector: 'fp-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  private account: User;
  constructor() {
  }
  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
  }
}
