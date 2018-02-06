import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveContactComponent } from './active-contact.component';

describe('ActiveContactComponent', () => {
  let component: ActiveContactComponent;
  let fixture: ComponentFixture<ActiveContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
