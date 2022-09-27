import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterationDetailsFormComponent } from './alteration-details-form.component';

describe('AlterationDetailsFormComponent', () => {
  let component: AlterationDetailsFormComponent;
  let fixture: ComponentFixture<AlterationDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterationDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
