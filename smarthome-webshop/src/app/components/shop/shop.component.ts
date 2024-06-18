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
  constructor(
    private productService: ProductService,
    private productListService: ProuctListService) { }

  products: ProductModel[] = [];
  pageSizeOptions: number[] = [5, 10]
  pageSize: number = 5
  totalProductAmount: Number = 10

  ngOnInit(): void {
    this.productService.getProducts(this.pageSize).subscribe(() => console.log(this.pageSize))

    this.productListService.products.subscribe(products => {
      this.products = products;
    });

    this.productService.productListCount.subscribe(count => {
      this.totalProductAmount = count
    })

    this.productService.currentPageSize.subscribe(size => {
      this.pageSize = size
    })

  }


}
