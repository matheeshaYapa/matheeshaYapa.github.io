import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitizationFormContainerComponent } from './digitization-form-container.component';

describe('DigitizationFormContainerComponent', () => {
  let component: DigitizationFormContainerComponent;
  let fixture: ComponentFixture<DigitizationFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitizationFormContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitizationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
