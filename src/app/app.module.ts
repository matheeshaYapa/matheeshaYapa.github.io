import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material/material.module";
import { DigitizationFormContainerComponent } from './containers/digitization-form-container/digitization-form-container.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import {CustomerDetailsFormComponent} from "./components/customer-details-form/customer-details-form.component";
import { AlterationDetailsFormComponent } from './components/alteration-details-form/alteration-details-form.component';
import { SignatureFormComponent } from './components/signature-form/signature-form.component';
import { OfficeUseOnlyFormComponent } from './components/office-use-only-form/office-use-only-form.component';
import { AlterationRemarksComponent } from './components/common/alteration-remarks/alteration-remarks.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { SignaturePadDialogBoxComponent } from './components/signature-pad-dialog-box/signature-pad-dialog-box.component';
import { PdfTemplateComponent } from './components/pdf-template/pdf-template.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitizationFormContainerComponent,
    HeaderComponent,
    FooterComponent,
    CustomerDetailsFormComponent,
    AlterationDetailsFormComponent,
    SignatureFormComponent,
    OfficeUseOnlyFormComponent,
    AlterationRemarksComponent,
    ActionButtonsComponent,
    SignaturePadDialogBoxComponent,
    PdfTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
