import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/userInfo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType;

  constructor(private userInfoS: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoS.getUserType(localStorage.getItem('user-id'));
    this.userInfoS.userTypeEmitter.subscribe(res => this.userType = res)
  }

}
