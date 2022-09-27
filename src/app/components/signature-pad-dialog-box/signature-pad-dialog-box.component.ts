import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signature-pad-dialog-box',
  templateUrl: './signature-pad-dialog-box.component.html',
  styleUrls: ['./signature-pad-dialog-box.component.scss']
})
export class SignaturePadDialogBoxComponent implements OnInit {

  @ViewChild('canvas') canvasEl: ElementRef;

  private signaturePad: SignaturePad;
  private signatureImage: string;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SignaturePadDialogBoxComponent>
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  onClearPad() {
    this.signaturePad.clear();
  }

  onSavePad() {
    if (this.signaturePad.isEmpty()) {
      this.snackBar.open('Please sign your signature', 'OK');
      return;
    }
    this.signatureImage = this.signaturePad.toDataURL();
    this.dialogRef.close(this.signatureImage);
  }

}
