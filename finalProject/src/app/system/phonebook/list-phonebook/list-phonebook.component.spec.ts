import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhonebookComponent } from './list-phonebook.component';

describe('ListPhonebookComponent', () => {
  let component: ListPhonebookComponent;
  let fixture: ComponentFixture<ListPhonebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPhonebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhonebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
