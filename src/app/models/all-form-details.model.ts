import {CustomerDetailsModel} from "./customer-details.model";
import {AlterationDetailsModel} from "./alteration-details.model";
import {SignatureDetailsModel} from "./signature-details.model";
import {OfficeUseDetailsModel} from "./office-use-details.model";

export interface AllFormDetailsModel {
  customerDetails: CustomerDetailsModel;
  alterationDetails: AlterationDetailsModel;
  signatureDetails: SignatureDetailsModel;
  officeUseDetails: OfficeUseDetailsModel;
}
