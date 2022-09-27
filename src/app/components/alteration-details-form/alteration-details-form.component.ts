import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators, ɵTypedOrUntyped} from "@angular/forms";
import {AlterationRemarksComponent} from "../common/alteration-remarks/alteration-remarks.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlterationDetailsModel, AlterationRemarksModel} from "../../models/alteration-details.model";

@Component({
  selector: 'app-alteration-details-form',
  templateUrl: './alteration-details-form.component.html',
  styleUrls: ['./alteration-details-form.component.scss']
})
export class AlterationDetailsFormComponent implements OnInit {

  @ViewChild('addressChangeRemarks') addressChangeRemarks: AlterationRemarksComponent;
  @ViewChild('billLedgerCopyRemarks') billLedgerCopyRemarks: AlterationRemarksComponent;
  @ViewChild('detailedBillIncomingRemarks') detailedBillIncomingRemarks: AlterationRemarksComponent;
  @ViewChild('detailedBillOutgoingRemarks') detailedBillOutgoingRemarks: AlterationRemarksComponent;
  @ViewChild('iddRemarks') iddRemarks: AlterationRemarksComponent;
  @ViewChild('imsiChangeRemarks') imsiChangeRemarks: AlterationRemarksComponent;
  @ViewChild('packageChangeRemarks') packageChangeRemarks: AlterationRemarksComponent;
  @ViewChild('reconnectionOfServiceRemarks') reconnectionOfServiceRemarks: AlterationRemarksComponent;
  @ViewChild('roamingRemarks') roamingRemarks: AlterationRemarksComponent;
  @ViewChild('temporarySuspensionRemarks') temporarySuspensionRemarks: AlterationRemarksComponent;
  @ViewChild('vasRemarks') vasRemarks: AlterationRemarksComponent;
  @ViewChild('requestToDisconnectRemarks') requestToDisconnectRemarks: AlterationRemarksComponent;
  @ViewChild('requestToChangeNumberRemarks') requestToChangeNumberRemarks: AlterationRemarksComponent;
  @ViewChild('requestToActivateDataRemarks') requestToActivateDataRemarks: AlterationRemarksComponent;
  @ViewChild('cancellationOfServiceRemarks') cancellationOfServiceRemarks: AlterationRemarksComponent;
  @ViewChild('otherRemarks') otherRemarks: AlterationRemarksComponent;

  public form: FormGroup = new FormGroup<any>({});

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  get formControls(): ɵTypedOrUntyped<any, any, { [p: string]: AbstractControl<any> }> {
    return this.form.controls;
  }

  public checkFormValidity(): boolean {
    if (this.form.valid) {
      if (!this.checkForAtLeastOneAlteration()) {
        this.snackBar.open('Please select at least one alteration', 'OK');
        return false;
      }
      return true;
    } else {
      this.form.markAllAsTouched();
      return false;
    }
  }

  public checkRemarksFormValidity(): boolean {
    if (!!this.formControls['addressChange'].value) {
      if (!this.addressChangeRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['billLedgerCopy'].value) {
      if (!this.billLedgerCopyRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['detailedBillIncoming'].value) {
      if (!this.detailedBillIncomingRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['detailedBillOutgoing'].value) {
      if (!this.detailedBillOutgoingRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['idd'].value) {
      if (!this.iddRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['imsiChange'].value) {
      if (!this.imsiChangeRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['packageChange'].value) {
      if (!this.packageChangeRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['reconnectionOfService'].value) {
      if (!this.reconnectionOfServiceRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['roaming'].value) {
      if (!this.roamingRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['temporarySuspension'].value) {
      if (!this.temporarySuspensionRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['vas'].value) {
      if (!this.vasRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['requestToDisconnect'].value) {
      if (!this.requestToDisconnectRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['requestToChangeNumber'].value) {
      if (!this.requestToChangeNumberRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['requestToActivateData'].value) {
      if (!this.requestToActivateDataRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['cancellationOfService'].value) {
      if (!this.cancellationOfServiceRemarks.checkFormValidity()) {
        return false;
      }
    }
    if (!!this.formControls['other'].value) {
      if (!this.otherRemarks.checkFormValidity()) {
        return false;
      }
    }
    return true;
  }

  public resetForm(): void {
    this.initializeForm();
  }

  public getAlterationData(): AlterationDetailsModel {
    const tempArray = new Array<AlterationRemarksModel>();
    console.log(this.formControls);
    for (const formControl in this.formControls) {
      if (formControl === 'dateRequired') {
        continue;
      }
      tempArray.push({
        ...this.AddRemarksDataToArray(formControl),
        alterationType: this.addAlterationTypeToArray(formControl)
      });
    }
    return {
      alterations: tempArray,
      dateRequired: new Date(this.formControls['dateRequired'].value)
    };
  }

  private initializeForm(): void {
    this.form = new FormGroup<any>({
      dateRequired: new FormControl(null, {validators: [Validators.required]}),
      addressChange: new FormControl(null, {validators: []}),
      billLedgerCopy: new FormControl(null, {validators: []}),
      detailedBillIncoming: new FormControl(null, {validators: []}),
      detailedBillOutgoing: new FormControl(null, {validators: []}),
      idd: new FormControl(null, {validators: []}),
      imsiChange: new FormControl(null, {validators: []}),
      packageChange: new FormControl(null, {validators: []}),
      reconnectionOfService: new FormControl(null, {validators: []}),
      roaming: new FormControl(null, {validators: []}),
      temporarySuspension: new FormControl(null, {validators: []}),
      vas: new FormControl(null, {validators: []}),
      requestToDisconnect: new FormControl(null, {validators: []}),
      requestToChangeNumber: new FormControl(null, {validators: []}),
      requestToActivateData: new FormControl(null, {validators: []}),
      cancellationOfService: new FormControl(null, {validators: []}),
      other: new FormControl(null, {validators: []}),
    });
  }

  private checkForAtLeastOneAlteration(): boolean {
    return !!this.formControls['addressChange'].value ||
      !!this.formControls['billLedgerCopy'].value ||
      !!this.formControls['detailedBillIncoming'].value ||
      !!this.formControls['detailedBillOutgoing'].value ||
      !!this.formControls['idd'].value ||
      !!this.formControls['imsiChange'].value ||
      !!this.formControls['packageChange'].value ||
      !!this.formControls['reconnectionOfService'].value ||
      !!this.formControls['roaming'].value ||
      !!this.formControls['temporarySuspension'].value ||
      !!this.formControls['vas'].value ||
      !!this.formControls['requestToDisconnect'].value ||
      !!this.formControls['requestToChangeNumber'].value ||
      !!this.formControls['requestToActivateData'].value ||
      !!this.formControls['cancellationOfService'].value ||
      !!this.formControls['other'].value;
  }

  private AddRemarksDataToArray(formControl: string): AlterationRemarksModel {
    switch (formControl) {
      case 'addressChange':
        return {
          ...this.addressChangeRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: '',
        };
      case 'billLedgerCopy':
        return {
          ...this.billLedgerCopyRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'detailedBillIncoming':
        return {
          ...this.detailedBillIncomingRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'detailedBillOutgoing':
        return {
          ...this.detailedBillOutgoingRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'idd':
        return {
          ...this.iddRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'imsiChange':
        return {
          ...this.imsiChangeRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'packageChange':
        return {
          ...this.packageChangeRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'reconnectionOfService':
        return {
          ...this.reconnectionOfServiceRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'roaming':
        return {
          ...this.roamingRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'temporarySuspension':
        return {
          ...this.temporarySuspensionRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'vas':
        return {
          ...this.vasRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'requestToDisconnect':
        return {
          ...this.requestToDisconnectRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'requestToChangeNumber':
        return {
          ...this.requestToChangeNumberRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'requestToActivateData':
        return {
          ...this.requestToActivateDataRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'cancellationOfService':
        return {
          ...this.cancellationOfServiceRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      case 'other':
        return {
          ...this.otherRemarks?.getRemarksData(),
          isSelected: !!this.formControls[formControl].value,
          alterationType: ''
        };
      default:
        return {
          alterationType: null,
          isSelected: false,
          remarks: null
        };
    }
  }

  private addAlterationTypeToArray(formControl: string): string {
    switch (formControl) {
      case 'addressChange':
        return 'Address Change';
      case 'billLedgerCopy':
        return 'Bill Ledger Copy';
      case 'detailedBillIncoming':
        return 'Detailed Bill (Incoming)';
      case 'detailedBillOutgoing':
        return 'Detailed Bill (Outgoing)';
      case 'idd':
        return 'IDD';
      case 'imsiChange':
        return 'IMSI Change';
      case 'packageChange':
        return 'Package Change';
      case 'reconnectionOfService':
        return 'Reconnection of Service';
      case 'roaming':
        return 'Roaming';
      case 'temporarySuspension':
        return 'Temporary Suspension';
      case 'vas':
        return 'VAS - Add/Remove & other add-on features';
      case 'requestToDisconnect':
        return 'Request to disconnect only outgoing';
      case 'requestToChangeNumber':
        return 'Request to Change Number';
      case 'requestToActivateData':
        return 'Request to activate data add-on/ad hoc service';
      case 'cancellationOfService':
        return 'Cancellation of Service (I acknowledge that upon disconnection of this service, the said service number will be recycled & re-issued to other Mobitel subscriber)';
      case 'other':
        return 'Other';
      default:
        return '';
    }
  }
}
