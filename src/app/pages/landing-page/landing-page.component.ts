import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/userInfo.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  isCollapsed = true;
  logedUser = localStorage.getItem('user-id');
  userType;
  constructor(private userInfoS: UserInfoService) {
    userInfoS.getUserType(localStorage.getItem('user-id'));
    userInfoS.userTypeEmitter.subscribe( res => this.userType = res);
  }
}
