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
  loading: boolean= true

  ngOnInit(): void {
    this.productService.getProducts(this.pageSize).subscribe(() => this.loading = false)

    this.productListService.products.subscribe(products => {
      this.products = products;

    if(this.products.length == 0){
      this.productService.getProducts(this.pageSize).subscribe(() => this.loading = false)
    }
    else{
      this.loading = false
    })

    this.productService.productListCount.subscribe(count => {
      this.totalProductAmount = count
    })

    this.productService.currentPageSize.subscribe(size => {
      this.pageSize = size
    })

  }


}
