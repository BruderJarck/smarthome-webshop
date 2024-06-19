import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { ProductService } from 'src/app/shared/product.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Login } from '../nav/nav.component';
import { ProductModel } from 'src/app/models';

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

    ) {}

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
    if (this.accountService.isLoggedIn() == true){
      if (this.pay() == true){
        this.itemsToBePruchased.forEach((element) => {
          console.log(element)
          if(element.product.category == 1){
            this.productService.submitOrder(localStorage.getItem("username") || "" , element.product.name).subscribe((resp)=> console.log(resp))
          }
        })
      }
      this.router.navigateByUrl("/webshop/sensors")
    }

    else{
      const dialogRef = this.dialog.open(loginOrAsGuestDialogComponent)
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  
  pay(): Boolean {
    return true;
  }
  }



@Component({
  selector: 'guest-enter-data-dialog',
  templateUrl: 'guest_enter_data_dialog.html',
})
export class GuestEnterDataComponent {
  constructor(private dialog: MatDialog,){}

  emailControl = new UntypedFormControl('', [Validators.required, Validators.email]);

  ngOnInit(){}

  submitEmail(email: string){
    if (this.emailControl.valid){
      console.log(email);
      this.dialog.closeAll()
    }
    else{
      console.log('invalid mail');
      
    }
    
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }
}

@Component({
  selector: 'login-or-as-guest-dialog',
  templateUrl: 'loginOrAsGuestDialog.html',
})
export class loginOrAsGuestDialogComponent {
  imgSrc = localStorage.getItem("profile_pic") || "assets/default_avatar.png"
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private shared: SharedService,
    private accountService: AccountService,
    private productService: ProductService,
  ){}
  
  ngOnInit(){
    this.imgSrc = localStorage.getItem("profile_pic") || ""
    if(this.accountService.isExpired(localStorage.getItem('access') || "") == false){
      this.router.navigateByUrl('/webshop/checkout')
    }
  }

  login(){
    localStorage.setItem('routeAfterLogin', '/webshop/checkout')
    const dialogRef = this.dialog.open(Login);

    this.shared.loginFailed.subscribe(res => {
      if(res == false){
        var buffer:any[] = this.shared.selectedProducts
        buffer.forEach(element => {
          if(element.product){
              element.product.ip_address = "default_ip_address"
              element.product.location = "default location"
              element.product.name = "default location "
          }
        })
        console.log(buffer);
        
          // this.productService.submitOrder(
          //   localStorage.getItem('email') || "no email found",
          //   buffer
          // ).subscribe((res) => console.log(res)
          // )
        };
        
        this.router.navigateByUrl('/webshop/checkout')
        this.dialog.closeAll()
      })
    

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.router.navigateByUrl("/checkout")
      // this.dialog.closeAll()
    });
  }

  asGuest(){
    const dialogRef = this.dialog.open(GuestEnterDataComponent);
  }
}