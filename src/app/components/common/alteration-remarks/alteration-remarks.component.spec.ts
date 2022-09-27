import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterationRemarksComponent } from './alteration-remarks.component';

describe('AlterationRemarksComponent', () => {
  let component: AlterationRemarksComponent;
  let fixture: ComponentFixture<AlterationRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterationRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterationRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
