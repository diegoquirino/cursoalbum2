import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMsgsComponent } from './alert-msgs.component';

describe('AlertMsgsComponent', () => {
  let component: AlertMsgsComponent;
  let fixture: ComponentFixture<AlertMsgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMsgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
