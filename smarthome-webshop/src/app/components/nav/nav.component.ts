import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { SharedService } from 'src/app/shared/shared.service';

export interface Chip {
  name: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  ammount: any = 0;

  constructor(
    public dialog: MatDialog, 
    public sharedService: SharedService,
    public router: Router,
    ) {}

  ngOnInit(): void {
    this.sharedService.reLogin.subscribe(
      reLoginState => {
        if(reLoginState == true){
          this.openDialog()
          this.sharedService.reLogin.next(false)
        }
      }
    )
    // this.sharedService.addProduct = 0;
    this.sharedService.productAmmount.subscribe((ammount: any) => {
      this.ammount = ammount;
    });
  }

  openDialog() {
    localStorage.setItem('routeAfterLogin', '/user')
    const dialogRef = this.dialog.open(Login);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      
    });
  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class Login {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  hide = true;
  constructor(
    public accountService: AccountService, 
    private router: Router,) {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    console.log(this.email)
    this.accountService
      .login(this.email.value, this.password.value)
      .subscribe(
        () =>{ this.router.navigateByUrl(localStorage.getItem('routeAfterLogin') || '/')}
      );
  }

  onLogout(){
    this.accountService.logout()

  }
}
