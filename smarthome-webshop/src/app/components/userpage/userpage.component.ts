import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss'],
})
export class UserpageComponent implements OnInit {
  constructor(
    private accountservice: AccountService,
  ) { }

  profile_picture_path: string = "/assets/default_avatar.png"
  username: String = "no user"
  email: String = "no email"
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "no username"
    this.email = localStorage.getItem('email') || "no email"

    if (localStorage.getItem('profile_pic') != 'null') {
      this.profile_picture_path = localStorage.getItem('profile_pic') || "/assets/default_avatar.png"
    }
    else {
      this.profile_picture_path = "/assets/default_avatar.png"
    }

  }
  logout() {
    this.accountservice.logout()
  }
}
