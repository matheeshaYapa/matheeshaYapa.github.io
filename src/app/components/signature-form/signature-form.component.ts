import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators, ɵTypedOrUntyped} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignaturePadDialogBoxComponent} from "../signature-pad-dialog-box/signature-pad-dialog-box.component";
import {SafeResourceUrl} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignatureDetailsModel} from "../../models/signature-details.model";

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.scss']
})
export class SignatureFormComponent implements OnInit {

  public form: FormGroup = new FormGroup<any>({});
  public signedImage: SafeResourceUrl;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get formControls(): ɵTypedOrUntyped<any, any, { [p: string]: AbstractControl<any> }> {
    return this.form.controls;
  }

  onSignatureClick(): void {
    const dialogRef = this.dialog.open(SignaturePadDialogBoxComponent, {
      panelClass: 'dialog-responsive',
      data: null,
    });

    dialogRef.afterClosed().subscribe(signedImage => {
      if (signedImage) {
        this.signedImage = signedImage;
      }
    });
  }

  public checkFormValidity(): boolean {
    if (this.form.valid) {
      if (!this.signedImage) {
        this.snackBar.open('Please sign your signature', 'OK');
        return false;
      }
      return true;
    } else {
      this.form.markAllAsTouched();
      return false;
    }
  }

  public getSignatureDetails(): SignatureDetailsModel {
    return {
      ...this.form.value,
      signedImage: this.signedImage
    };
  }

  public resetForm(): void {
    this.initializeForm();
    this.signedImage = null;
  }

  private initializeForm(): void {
    this.form = new FormGroup<any>({
      signatureDate: new FormControl(null, {validators: [Validators.required]}),
      dealerCSE: new FormControl(null, {validators: [Validators.required]}),
      dealerCSEDate: new FormControl(null, {validators: [Validators.required]})
    });
  }

}
