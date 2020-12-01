import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  isCollapsed = true;
  localId = localStorage.getItem('user-id');
  constructor(private authUserS: AuthService) {}
  singOut(){
    this.authUserS.singout();
  }
}
