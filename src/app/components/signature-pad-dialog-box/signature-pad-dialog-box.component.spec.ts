import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadDialogBoxComponent } from './signature-pad-dialog-box.component';

describe('SignaturePadDialogBoxComponent', () => {
  let component: SignaturePadDialogBoxComponent;
  let fixture: ComponentFixture<SignaturePadDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaturePadDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaturePadDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
