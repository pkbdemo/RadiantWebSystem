import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainAreaComponent } from './maintain-area.component';

describe('MaintainAreaComponent', () => {
  let component: MaintainAreaComponent;
  let fixture: ComponentFixture<MaintainAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
