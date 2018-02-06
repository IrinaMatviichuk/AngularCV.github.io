import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderFieldComponent } from './sender-field.component';

describe('SenderFieldComponent', () => {
  let component: SenderFieldComponent;
  let fixture: ComponentFixture<SenderFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
