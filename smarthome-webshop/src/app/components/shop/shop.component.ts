import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models';
import { ProductService } from 'src/app/shared/product.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: ProductModel[] = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        this.productService.products = res;
        this.products = res;
      },
      (err) => console.log(err)
    );
  }
}
