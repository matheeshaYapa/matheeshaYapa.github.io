import {Component, Input, OnInit} from '@angular/core';
import {AllFormDetailsModel} from "../../models/all-form-details.model";

@Component({
  selector: 'app-pdf-template',
  templateUrl: './pdf-template.component.html',
  styleUrls: ['./pdf-template.component.scss']
})
export class PdfTemplateComponent implements OnInit {

  @Input() templateData: AllFormDetailsModel;

  constructor() { }

  ngOnInit(): void {
  }

}
