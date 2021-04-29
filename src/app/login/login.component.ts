import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.changeLoadingState(true);
    setTimeout(() => {
      this.loadingService.changeLoadingState(false);
    }, 9000);
  }

  public login() {
    this.authService.setUserToken('token');
    this.router.navigate(['home']);
  }

}
