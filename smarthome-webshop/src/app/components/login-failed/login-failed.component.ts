import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss']
})
export class LoginFailedComponent implements OnInit {

  constructor(private sharedSerice: SharedService) { }

  ngOnInit(): void {
  }

  reLogin() {
    this.sharedSerice.reLogin.next(true)
  }

}
