import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRecordsComponent } from './session-records.component';

describe('SessionRecordsComponent', () => {
  let component: SessionRecordsComponent;
  let fixture: ComponentFixture<SessionRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
