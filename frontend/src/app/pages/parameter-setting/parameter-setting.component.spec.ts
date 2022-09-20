import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ParameterSettingViewComponent } from './parameter-setting.component'

describe('ParameterSettingViewComponent', () => {
  let component: ParameterSettingViewComponent
  let fixture: ComponentFixture<ParameterSettingViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterSettingViewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSettingViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
