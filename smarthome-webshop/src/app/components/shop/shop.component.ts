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
  pageSizeOptions: number[] = [2, 5, 10]
  totalProductAmount: number = 10
  previousPageIndex: number = 0
  previous: string = ""
  next: string = ""

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log("products: ", res)
        this.productListService.addProduct(res.results)
      },
    )
    this.productService.getTotalProductCount().subscribe(
      (res) => this.totalProductAmount = res.total_count
    )
    this.productListService.products$.subscribe(products => {
      this.products = products;
    });
  }
  onPageChange(event: any) {
    
    if (event.pageIndex > this.previousPageIndex) {
      this.productService.getProducts(this.next, event.pageSize).subscribe((res) =>{
        this.productListService.clearProducts()
        this.productListService.addProduct(res.results)
        this.next = res.next
        this.previous = res.previous
      })
    }
    else {
      this.productService.getProducts(this.previous, event.pageSize).subscribe((res) =>{
        this.productListService.clearProducts()
        this.productListService.addProduct(res.results)
        this.previous = res.previous
        this.next = res.next
      })
    }
    this.previousPageIndex = event.pageIndex
    
    
    console.log(event)
  }

}
