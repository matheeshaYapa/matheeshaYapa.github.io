import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerDetailsFormComponent} from "../../components/customer-details-form/customer-details-form.component";
import {
  AlterationDetailsFormComponent
} from "../../components/alteration-details-form/alteration-details-form.component";
import {SignatureFormComponent} from "../../components/signature-form/signature-form.component";
import {OfficeUseOnlyFormComponent} from "../../components/office-use-only-form/office-use-only-form.component";
import {AllFormDetailsModel} from "../../models/all-form-details.model";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-digitization-form-container',
  templateUrl: './digitization-form-container.component.html',
  styleUrls: ['./digitization-form-container.component.scss']
})
export class DigitizationFormContainerComponent implements OnInit {

  @ViewChild(CustomerDetailsFormComponent) customerDetailsForm: CustomerDetailsFormComponent;
  @ViewChild(AlterationDetailsFormComponent) alterationDetailsForm: AlterationDetailsFormComponent;
  @ViewChild(SignatureFormComponent) signatureForm: SignatureFormComponent;
  @ViewChild(OfficeUseOnlyFormComponent) officeUseOnlyForm: OfficeUseOnlyFormComponent;
  @ViewChild('pdfTemplate') pdfTemplateComponent: ElementRef;

  public submittedData: AllFormDetailsModel;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitClick(): void {
    if (!this.checkAllFormsValidity()) {
      return;
    }
    this.submittedData = {
      customerDetails: this.customerDetailsForm.getCustomerDetailsData(),
      alterationDetails: this.alterationDetailsForm.getAlterationData(),
      signatureDetails: this.signatureForm.getSignatureDetails(),
      officeUseDetails: this.officeUseOnlyForm.getOfficeUseDetails()
    };
    setTimeout(() => {
      pdfMake.createPdf(this.setPDFDefinitions()).open();
    }, 10);

  }

  onResetClick(): void {
    this.customerDetailsForm.resetForm();
    this.alterationDetailsForm.resetForm();
    this.signatureForm.resetForm();
    this.officeUseOnlyForm.resetForm();
    this.submittedData = null;
  }

  private checkAllFormsValidity(): boolean {
    return this.customerDetailsForm.checkFormValidity() &&
      this.alterationDetailsForm.checkFormValidity() &&
      this.alterationDetailsForm.checkRemarksFormValidity() &&
      this.signatureForm.checkFormValidity() &&
      this.officeUseOnlyForm.checkFormValidity();
  }

  private setPDFDefinitions(): any {
    return {
      pageMargins: [ 40, 15, 40, 15 ],
      content: [
        // HEADER SECTION - START
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Alteration to Mobile Services',
              style: 'header'
            },
            {
              image: 'data:image/png;base64,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',
              width: 100,
              alignment: 'right',
              margin: [0, 0, 0, 10]
            }
          ]
        },
        // HEADER SECTION - END

        // CUSTOMER DETAILS SECTION - START
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'CUSTOMER DETAILS (must be same as per the original application)',
                  style: 'subheader',
                  borderColor: ['#0044ae', '#0044ae', '#0044ae', '#fff']
                }
              ],
              [
                {
                  type: 'none',
                  lineHeight: 1.5,
                  ol: this.setCustomerDetailsToPDF(),
                  borderColor: ['#0044ae', '#fff', '#0044ae', '#0044ae']
                }
              ]

            ]
          }
        },
        // CUSTOMER DETAILS SECTION - END

        // ALTERATION DETAILS SECTION - START
        {
          alignment: 'justify',
          style: 'alterationSubHeader',
          columns: [
            {text: 'Alteration Details'},
            {text: `Date Required: ${this.submittedData.alterationDetails.dateRequired?.toLocaleDateString() || '.../.../...'}`, alignment: 'right'}
          ]
        },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', '*', '*'],
            body: [
              [
                {text: 'Select', style: 'tableHeader', alignment: 'center', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
                {text: 'Service', style: 'tableHeader', alignment: 'center', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
                {text: 'Remarks', style: 'tableHeader', alignment: 'center', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
              ],
              ...this.setAlterationDetailsToPDF()
            ]
          }
        },
        // ALTERATION DETAILS SECTION - END

        // SIGNATURE DETAILS SECTION - START
        {
          style: 'tableExample',
          margin: [0, 10, 0, 0],
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'I request the above alteration to my Mobitel Service. I\'ve also read and understood the charges applicable against the services required and abide by all terms and conditions set by Mobitel from time to time.',
                  borderColor: ['#0044ae', '#0044ae', '#0044ae', '#fff']
                }
              ],
              [
                {
                  type: 'none',
                  ol: this.setSignatureDetailsToPDF(),
                  borderColor: ['#0044ae', '#fff', '#0044ae', '#0044ae']
                }
              ]

            ]
          }
        },
        // SIGNATURE DETAILS SECTION - END

        // OFFICE DETAILS SECTION - START
        {
          text: 'Office Use Only',
          style: 'alterationSubHeader',
          margin: [0, 20, 0, 0]
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              ...this.setOfficeUseDataToPDF()
            ]
          }
        },
        // OFFICE DETAILS SECTION - END

        // FOOTER SECTION - START
        {
          text: 'Mobitel (Pvt) Ltd',
          alignment: 'center',
          style: 'footerMain'
        },
        {
          text: 'Rotunda towers, 109, Galle road, Colombo 03',
          alignment: 'center',
          style: 'footerSub'
        },
        {
          text: 'Customer Service Hotline: 1717   Fax: 2330396',
          alignment: 'center',
          style: 'footerSub'
        }
      ],
      defaultStyle: {
        fontSize: 9,
        color: '#0044ae'
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 0],
          alignment: 'center'
        },
        subheader: {
          fontSize: 11,
          bold: true,
          margin: [10, 5, 5, 5]
        },
        alterationSubHeader: {
          fontSize: 11,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: '#fff',
          fillColor: '#336cc5'
        },
        footerMain: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 0]
        },
        footerSub: {
          bold: true
        }
      }
    };
  }

  private setCustomerDetailsToPDF(): Array<any> {
    return [
      {
        columns: [
          {
            text: `Customer/Company Name:\t\t\t ${this.submittedData.customerDetails.customerOrCompanyName || ''}`
          }
        ]
      },
      {
        columns: [
          {text: `Contact Number:\t\t\t ${this.submittedData.customerDetails.contactNumber || ''}`},
          {text: `Email Address:\t\t\t ${this.submittedData.customerDetails.email || ''}`}
        ]
      },
      {
        columns: [
          {text: `Mobitel Number:\t\t\t ${this.submittedData.customerDetails.mobitelNumber || ''}`},
          {text: `Account Number:\t\t\t ${this.submittedData.customerDetails.accountNumber || ''}`}
        ]
      }
    ];
  }

  private setAlterationDetailsToPDF(): Array<any> {
    console.log(this.submittedData.alterationDetails);
    return this.submittedData.alterationDetails.alterations.map(alteration => {
      return [
        alteration.isSelected ?
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmpJREFUWEeVV+11wyAMRLM1HSBdyGSheoBmN/pAEkggIeIffY4L+rw7AaSjB2hVEavrt5Lwb/yodeIHWj61ovyMTXo7/4qMjgTi8GWMbR8Zj3wYmc1buLbHRVh9Wq3wI3MDGGWI0rL+DylB6WAwm/O4r+bj/XzJkoObuiy12yQv2Ol7c14ymoEsg6ihH+I4gIoHC+WcbdQgfl7Mog+rX4tWNPUAUipIRpWO6VwG8Xx1EM75WdT6qFbk3EEMJQBZBGBkZlT9KIjHbwUc93zTYhWA3+PudH1ZN4myY0r10VqJ+Iac/twWaFr13kbpq8wJ8+xeCxiCsFTMzL5MvlryMU2AnrkdZatG04qFhqKKHl+ZYpQFGhKQf9wXQMlEhM14IecixiHFj/sqUPLELyUaJl83VJuYlOH9fM2TEwM44KsJ0e/7SqXknZYREJ1EKgYUahFuk8ykRIhVFWiAY3ndaZnu+ao3CLo8qEJ6sGBJGNJYIflbDyeQIJc2fHwQuy0QqJU8zs3YgpUpr2Z18Nw/MeEsxKdm5RlGg13vfcnSOh+vw9qMxwNjJEDKCLfK2TR9XocRIzsInzfy6YzaTGPW3jx885tsQVgJGbo54yaqReuHVNvH4q02zKBDwMU9HxN31KC7N5rzpY5Sgg1ydO95juNGKgvrOpobUkzhD8rQwpnzSqs957j3BLtMsP3txj3X7cveT2qbSFYWACQopd89lE406W1bBOD2eUZVWAPgnvE5oVkQ7aivEeAirwKtRgUOTukSwpubqUlWaZ4uBUY8BM+Ta29X3zXwJQCDaP1mtOJW00Vz/ExkYl1I6R9w0EYYrVwcTAAAAABJRU5ErkJggg==',
            width: '10',
            alignment: 'center',
            borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']
          } :
          {text: '', alignment: 'center', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
        {
          text: alteration.alterationType === 'IDD' ?
            `${alteration.alterationType}\t\t\t\t\t\t${alteration.iddType || ''}` :
            (alteration.alterationType === 'IMSI Change' ?
              `${alteration.alterationType}\t\t\t\t\t\t${alteration.simOption === 'migration' ? '3G to 4G Migration' : (alteration.simOption === 'replacement' ? 'SIM Replacement' : '')}` :
              (alteration.alterationType === 'Roaming' ?
                `${alteration.alterationType}\t\t\t\t\t\t${
                (alteration.isRoamingSMS && alteration.isRoamingVoice ? 'SMS, Voice' :
                  (alteration.isRoamingVoice ? 'Voice' : (
                  alteration.isRoamingSMS ? 'SMS' : ''
                  )))}` :
                alteration.alterationType)),
          borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']
        },
        {
          text: alteration.alterationType === 'Address Change' ?
            `Reason:\n${alteration.reason || ''}\n\n${alteration.remarks || ''}` :
            (alteration.alterationType === 'IMSI Change' ?
              `SIM No.:\t${alteration.simNumber || ''}${alteration.remarks ? `\n\n${alteration.remarks}` : ''}` :
              (alteration.alterationType === 'Package Change' ?
                `New Package:\t${alteration.newPackage || ''}${alteration.remarks ? `\n\n${alteration.remarks}` : ''}` :
                alteration.remarks ?? '')),
          borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']
        }
      ];
    })
  }

  private setSignatureDetailsToPDF(): any {
    return [
      {
        columns: [
          {
            style: 'tableExample',
            table: {
              widths: ['auto'],
              body: [
                [
                  {text: 'Customer Signature:', borderColor: ['#fff', '#fff', '#fff', '#fff']},
                ],
                [
                  this.submittedData.signatureDetails.signedImage ?
                    {image: this.submittedData.signatureDetails.signedImage, width: 100, borderColor: ['#fff', '#fff', '#fff', '#fff']} : null
                ]
              ]
            }
          },
          {
            text: `Date: ${this.submittedData.signatureDetails.signatureDate?.toLocaleDateString() || ''}`,
            margin: [0, 10, 0, 0]
          }
        ],
      },
      {
        columns: [
          {
            text: `Dealer/CSE: ${this.submittedData.signatureDetails.dealerCSE || ''}`,
            margin: [5, 0, 0, 5]
          },
          {
            text: `Date: ${this.submittedData.signatureDetails.dealerCSEDate?.toLocaleDateString() || ''}`,
            margin: [0, 0, 0, 5]
          }
        ]
      }
    ];
  }

  private setOfficeUseDataToPDF(): Array<any> {
    return [
      [
        {text: 'Office NIC/DL/PPT seen', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
        {text: this.submittedData.officeUseDetails.originalNICSeen ? 'Yes' : '', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
      ],
      [
        {text: 'Signature / Image verified', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
        {text: this.submittedData.officeUseDetails.signatureImageVerified ? 'Yes' : '', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
      ],
      [
        {text: 'Voucher/Receipt number', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
        {text: this.submittedData.officeUseDetails.voucherReceiptNumber || '', borderColor: ['#0044ae', '#0044ae', '#0044ae', '#0044ae']},
      ]
    ];
  }

}
