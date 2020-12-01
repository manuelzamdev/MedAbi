import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  opc1 = false;
  opc2 = false;
  opc3 = false;
  opc4 = false;
  opc5 = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleOpc() {
    this.opc1 = false;
    this.opc2 = false;
    this.opc3 = false;
    this.opc4 = false;
    this.opc5 = false;
  }

  chatWithDoctor() {
    localStorage.setItem('newChat', 'GZi90MweOVbRxL7XEbKcwoUCMm03');
    this.router.navigate(['/admin']);
  }
}
