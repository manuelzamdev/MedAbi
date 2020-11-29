import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  email = '';
  password = '';
  message = '';
  fullname = '';
  terms;
  errorMessage = ''; // error handle
  error: { name: string, message: string } = { name: '', message: '' }; // firebase error handle
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    const squares1 = document.getElementById('square1');
    const squares2 = document.getElementById('square2');
    const squares3 = document.getElementById('square3');
    const squares4 = document.getElementById('square4');
    const squares5 = document.getElementById('square5');
    const squares6 = document.getElementById('square6');
    const squares7 = document.getElementById('square7');
    const squares8 = document.getElementById('square8');

    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares2.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares3.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares4.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares5.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares6.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares7.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
    squares8.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    // tslint:disable-next-line: deprecation
    this.onMouseMove(event);
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  register() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {

      this.authService.registerWithEmail(this.email, this.password, this.fullname)
        .then(() => {
          this.message = 'you are register with data on firebase';
          // this.router.navigate(['/userinfo'])
        }).catch(_error => {
          this.error = _error;
          this.router.navigate(['/register']);
        });
    }
  }

  validateForm(email, password) {
    if(email.lenght === 0)
    {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
