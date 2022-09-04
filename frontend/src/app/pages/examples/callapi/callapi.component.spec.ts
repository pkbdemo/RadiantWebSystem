import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallapiComponent } from './callapi.component';

describe('CallapiComponent', () => {
  let component: CallapiComponent;
  let fixture: ComponentFixture<CallapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
