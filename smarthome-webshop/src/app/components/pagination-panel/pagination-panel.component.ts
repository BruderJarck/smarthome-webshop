import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-pagination-panel',
  templateUrl: './pagination-panel.component.html',
  styleUrl: './pagination-panel.component.scss'
})
export class PaginationPanelComponent {

  constructor(
    private productService: ProductService) { }

  pageSizeOptions: number[] = [5, 10]
  pageSize: number = 5
  totalProductAmount: Number = 10

  ngOnInit(){
    this.productService.productListCount.subscribe((count) => {
      this.totalProductAmount = count
    })
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize
    this.productService.updatePageSize(event.pageSize) 
    const offset = event.pageIndex * this.pageSize
    this.productService.getProducts(event.pageSize, offset).subscribe()
  }
}
