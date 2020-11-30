import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-module',
  templateUrl: './patient-module.component.html',
  styleUrls: ['./patient-module.component.scss']
})
export class PatientModuleComponent implements OnInit {
  isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
