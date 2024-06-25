import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  ammount: string = "0";
  searchValue: string = ""

  pageSize: number = 5

  constructor(
    public dialog: MatDialog,
    public sharedService: SharedService,
    public productService: ProductService,
    public productListService: ProuctListService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.dialog.open(DiscaimerDialog)
    this.sharedService.reLogin.subscribe(
      reLoginState => {
        if (reLoginState == true) {
          this.openDialog()
          this.sharedService.reLogin.next(false)
        }
      }
    )
    this.sharedService.productAmmount.subscribe((ammount: string) => {
      this.ammount = ammount;
    });
    this.productService.currentPageSize.subscribe(size => this.pageSize = size)
  }
  openDialog() {
    localStorage.setItem('routeAfterLogin', '/webshop/user')
    const dialogRef = this.dialog.open(Login);
  }
  home() {
    this.searchValue = ""
    this.productService.searchParam = ""
    this.router.navigateByUrl("webshop/product-list")
    this.productService.getProducts(this.pageSize).subscribe()
  }

  search() {
    this.router.navigateByUrl("webshop/product-list")
    if (this.searchValue != "") {
      this.productService.searchProducts(this.searchValue).subscribe(
        (res) => {
          if (this.searchValue != "") {
            this.productListService.clearProducts()
            this.productListService.addProduct(res.results)
          }
          else {
            this.productService.getProducts(this.pageSize).subscribe()
          }
        }
      )
    }
    else {
      this.home()

    }

  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class Login {
  username = new UntypedFormControl('', [Validators.min(1)]);
  password = new UntypedFormControl('', [Validators.min(1)]);

  hide = true;
  constructor(
    public accountService: AccountService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<Login>

  ) { }

  getErrorMessage() {
    return this.username.hasError('required') ? 'Sie müssen einen wert eingeben' : '';
  }

  onSubmit() {
    if (this.username.value && this.password.value != "") {
      this.accountService
        .login(this.username.value, this.password.value)
        .subscribe(
          () => {
            this.dialogRef.close(true)
            this.sharedService.customerMessage.next(`Willkommen ${this.username.value}, Sie haben sich erfolgreich eingelogged`)

          }
        );
    }
  }

  onLogout() {
    this.accountService.logout()
  }
}

@Component({
  selector: 'discaimer-dialog',
  templateUrl: 'discaimer-dialog.html',
})
export class DiscaimerDialog {
  constructor() { }
}