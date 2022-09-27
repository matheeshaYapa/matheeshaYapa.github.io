import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ɵTypedOrUntyped} from "@angular/forms";
import {OfficeUseDetailsModel} from "../../models/office-use-details.model";

@Component({
  selector: 'app-office-use-only-form',
  templateUrl: './office-use-only-form.component.html',
  styleUrls: ['./office-use-only-form.component.scss']
})
export class OfficeUseOnlyFormComponent implements OnInit {

  public form: FormGroup = new FormGroup<any>({});

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get formControls(): ɵTypedOrUntyped<any, any, { [p: string]: AbstractControl<any> }> {
    return this.form.controls;
  }

  public checkFormValidity(): boolean {
    if (this.form.valid) {
      return true;
    } else {
      this.form.markAllAsTouched();
      return false;
    }
  }

  public getOfficeUseDetails(): OfficeUseDetailsModel {
    return {
      ...this.form.value
    };
  }

  public resetForm(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup<any>({
      originalNICSeen: new FormControl(null, {validators: []}),
      signatureImageVerified: new FormControl(null, {validators: []}),
      voucherReceiptNumber: new FormControl(null, {validators: []})
    });
  }

}
