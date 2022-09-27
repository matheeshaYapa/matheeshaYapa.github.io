import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeUseOnlyFormComponent } from './office-use-only-form.component';

describe('OfficeUseOnlyFormComponent', () => {
  let component: OfficeUseOnlyFormComponent;
  let fixture: ComponentFixture<OfficeUseOnlyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeUseOnlyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeUseOnlyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
