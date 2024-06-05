import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models';
import { ProductService } from 'src/app/shared/product.service';
import { ProuctListService } from 'src/app/shared/prouct-list.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private productService: ProductService,
              private productListService: ProuctListService) {}
  products: ProductModel[] = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        this.productListService.addProduct(res)
        
      },
    )

    this.productListService.products$.subscribe(products => {
      this.products = products;
    });
  }
}
