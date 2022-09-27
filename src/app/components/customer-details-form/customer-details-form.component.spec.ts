import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsFormComponent } from './customer-details-form.component';

describe('RegistrationFormComponent', () => {
  let component: CustomerDetailsFormComponent;
  let fixture: ComponentFixture<CustomerDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
