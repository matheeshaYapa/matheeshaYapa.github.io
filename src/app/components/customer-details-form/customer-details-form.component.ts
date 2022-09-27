import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators, ɵTypedOrUntyped} from "@angular/forms";
import {CustomerDetailsModel} from "../../models/customer-details.model";

@Component({
  selector: 'app-customer-details-form',
  templateUrl: './customer-details-form.component.html',
  styleUrls: ['./customer-details-form.component.scss']
})
export class CustomerDetailsFormComponent implements OnInit {

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

  public getCustomerDetailsData(): CustomerDetailsModel {
    return {
      ...this.form.value
    };
  }

  public resetForm(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup<any>({
      customerOrCompanyName: new FormControl(null, {validators: []}),
      contactNumber: new FormControl(null, {validators: [Validators.pattern(/^\d{10}$/)]}),
      mobitelNumber: new FormControl(null, {validators: [Validators.pattern(/^07\d{8}$/)]}),
      email: new FormControl(null, {validators: [Validators.email]}),
      accountNumber: new FormControl(null, {validators: [Validators.pattern(/^[0-9]+$/)]}),
    });
  }

}
