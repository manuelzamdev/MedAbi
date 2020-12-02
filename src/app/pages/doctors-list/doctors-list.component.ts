import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/userInfo.service';

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
  doctors = [];
  doctorsType0;
  doctorsType1;
  doctorsType2;
  doctorsType3;
  doctorsType4;
  constructor(private router: Router, private userInfoS: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoS.getDoctors();
    this.userInfoS.userDataEmitter.subscribe(data => {
      this.doctors = data;
      // tslint:disable-next-line: triple-equals
      this.doctorsType0 = this.doctors.filter(el => el.category == 0);
      // tslint:disable-next-line: triple-equals
      this.doctorsType1 = this.doctors.filter(el => el.category == 1);
      // tslint:disable-next-line: triple-equals
      this.doctorsType2 = this.doctors.filter(el => el.category == 2);
      // tslint:disable-next-line: triple-equals
      this.doctorsType3 = this.doctors.filter(el => el.category == 3);
      // tslint:disable-next-line: triple-equals
      this.doctorsType4 = this.doctors.filter(el => el.category == 4);
      console.log(this.doctorsType1);
    });
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
