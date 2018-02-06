import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenceFieldComponent } from './correspondence-field.component';

describe('CorrespondenceFieldComponent', () => {
  let component: CorrespondenceFieldComponent;
  let fixture: ComponentFixture<CorrespondenceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondenceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondenceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
