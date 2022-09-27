import {SafeResourceUrl} from "@angular/platform-browser";

export interface SignatureDetailsModel {
  signedImage: SafeResourceUrl;
  signatureDate: Date;
  dealerCSE: string;
  dealerCSEDate: Date;
}
