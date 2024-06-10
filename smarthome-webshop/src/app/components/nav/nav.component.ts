import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { ProductService } from 'src/app/shared/product.service';
import { ProuctListService } from 'src/app/shared/prouct-list.service';
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
  ammount: number = 0;
  searchValue: string = ""

  defaultPageSize: number = 5
  
  constructor(
    public dialog: MatDialog,
    public sharedService: SharedService,
    public productService: ProductService,
    public productListService: ProuctListService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.sharedService.reLogin.subscribe(
      reLoginState => {
        if (reLoginState == true) {
          this.openDialog()
          this.sharedService.reLogin.next(false)
        }
      }
    )
    this.sharedService.productAmmount.subscribe((ammount: any) => {
      this.ammount = ammount;
    });
  }

  openDialog() {
    localStorage.setItem('routeAfterLogin', '/user')
    const dialogRef = this.dialog.open(Login);
  }
  home(){
    this.searchValue = ""
    this.productService.searchParam = ""
    this.productService.getProducts(5).subscribe()
  }

  search() {
    this.productService.searchProducts(this.searchValue).subscribe(
      (res) => {
        if (this.searchValue != "") {
          this.productListService.clearProducts()
          this.productListService.addProduct(res.results)
        }
        else {
          this.productService.getProducts(5).subscribe()
        }
      }
    )
  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class Login {
  email = new UntypedFormControl('', [Validators.required]);
  password = new UntypedFormControl('', [Validators.required]);

  hide = true;
  constructor(
    public accountService: AccountService
  ) { }

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
        (res) => { console.log(res) }
      );
  }

  onLogout() {
    this.accountService.logout()
  }
}
