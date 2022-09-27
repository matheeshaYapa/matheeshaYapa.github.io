import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ɵTypedOrUntyped} from "@angular/forms";
import {AlterationRemarksModel} from "../../../models/alteration-details.model";

@Component({
  selector: 'app-alteration-remarks',
  templateUrl: './alteration-remarks.component.html',
  styleUrls: ['./alteration-remarks.component.scss']
})
export class AlterationRemarksComponent implements OnInit {

  @Input() isReason = false;
  @Input() isIDD = false;
  @Input() isSIMNumber = false;
  @Input() isNewPackage = false;
  @Input() isRoaming = false;

  public form: FormGroup = new FormGroup<any>({});

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get formControls(): ɵTypedOrUntyped<any, any, { [p: string]: AbstractControl<any> }> {
    return this.form.controls;
  }

  public checkFormValidity(): boolean {
    if (this.isSIMNumber) {
      if (this.formControls['simNo'].valid && this.formControls['remarks'].valid) {
        return true;
      } else {
        this.form.markAllAsTouched();
        return false;
      }
    }
    if (this.isReason) {
      if (this.formControls['reason'].valid && this.formControls['remarks'].valid) {
        return true;
      } else {
        this.form.markAllAsTouched();
        return false;
      }
    }
    if (this.isNewPackage) {
      if (this.formControls['newPackage'].valid && this.formControls['remarks'].valid) {
        return true;
      } else {
        this.form.markAllAsTouched();
        return false;
      }
    }
    if (this.formControls['remarks'].valid) {
      return true;
    } else {
      this.form.markAllAsTouched();
      return false;
    }
  }

  public getRemarksData(): AlterationRemarksModel {
    return {
      alterationType: '',
      isSelected: true,
      remarks: this.formControls['remarks'].value,
      reason: this.isReason ? this.formControls['reason'].value : null,
      iddType: this.isIDD ? this.formControls['activationOrDeactivation'].value : null,
      newPackage: this.isNewPackage ? this.formControls['newPackage'].value : null,
      isRoamingSMS: this.isRoaming ? !!this.formControls['roamingSMS'].value : null,
      isRoamingVoice: this.isRoaming ? !!this.formControls['roamingVoice'].value : null,
      simOption: this.isSIMNumber ? this.formControls['simOption'].value : null,
      simNumber: this.isSIMNumber ? this.formControls['simNo'].value : null,
    };
  }

  private initializeForm(): void {
    this.form = new FormGroup<any>({
      reason: new FormControl(null, {validators: []}),
      remarks: new FormControl(null, {validators: []}),
      activationOrDeactivation: new FormControl('activation', {validators: []}),
      roamingVoice: new FormControl(null, {validators: []}),
      roamingSMS: new FormControl(null, {validators: []}),
      simOption: new FormControl(null, {validators: []}),
      simNo: new FormControl(null, {validators: []}),
      newPackage: new FormControl(null, {validators: []}),
    });
  }

}
