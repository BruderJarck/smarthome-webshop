import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { ProductService } from 'src/app/shared/product.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Login } from '../nav/nav.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public itemsToBePruchased: any[] = [];

  totalPrice: number = 0;
  mwst: number = 0.24; //in %
  workCost: number = 120; //in €
  totalItems: number = 0;
  totalItemsBaseCost: number = 0;
  shipCost: number = 78; //in €
  show_dialog: boolean = false

  constructor(
    public sharedService: SharedService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private productService: ProductService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.sharedService.productList.subscribe((item) => {
      this.itemsToBePruchased = [...item];

      this.calcPrice();
    });
  }

  removeItem(event: any) {
    let id = event.product.id;
    this.sharedService.deleteProductById(id);
  }

  changeAmmount(event: any, who: string, input: any) {
    let id = event.product.id;

    if (who == 'neut') {
      this.sharedService.changeAmmountById(id, input.target.value);
    } else if (who == 'add') {
      this.sharedService.changeAmmountById(id, 1);
    } else if (who == 'sub') {
      this.sharedService.changeAmmountById(id, -1);
    }
  }

  calcPrice() {
    this.totalItems = 0;
    this.totalPrice = 0;
    this.totalItemsBaseCost = 0;

    for (let item of this.itemsToBePruchased) {
      this.totalItemsBaseCost =
        this.totalItemsBaseCost + item.ammount * (item.product.price + 0.99);
      this.totalItems = this.totalItems + item.ammount;
    }

    this.totalPrice =
      this.totalItemsBaseCost +
      this.mwst * this.totalItemsBaseCost +
      this.workCost +
      this.shipCost * this.totalItems;
  }

  checkout(): void {
    if (this.accountService.isLoggedIn() == true) {
      if (this.pay() == true) {
        this.itemsToBePruchased.forEach((element) => {
          if (element.product.category == 1) {
            this.productService.submitOrder(localStorage.getItem("username") || "", element.product).subscribe()
          }
          this.sharedService.clearProducs()
        })
      }
      this.router.navigateByUrl("/webshop/produc-list")
    }

    else {
      const dialogRef = this.dialog.open(Login);
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.checkout()
        }
      })
    }
  }

  pay(): Boolean {
    return true;
  }
}