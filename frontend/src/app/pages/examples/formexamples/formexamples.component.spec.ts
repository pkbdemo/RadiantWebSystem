import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormexamplesComponent } from './formexamples.component';

describe('FormexamplesComponent', () => {
  let component: FormexamplesComponent;
  let fixture: ComponentFixture<FormexamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormexamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormexamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
