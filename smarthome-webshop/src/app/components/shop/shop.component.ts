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
  totalProductAmount: Number = 10

  ngOnInit(): void {
    this.productService.getProducts(5).subscribe()
    
    this.productListService.products.subscribe(products => {
      this.products = products;
    });

    this.productService.productListCount.subscribe(count => {
      this.totalProductAmount = count
    })
  }

  onPageChange(event: any) {
    this.productService.currentPageSize = event.pageSize
    const offset = event.pageIndex * this.productService.currentPageSize
    this.productService.getProducts(event.pageSize, offset).subscribe()
  }
}
