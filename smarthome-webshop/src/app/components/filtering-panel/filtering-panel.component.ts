import { Component } from '@angular/core';
import { ProductCategoryModel } from 'src/app/models';
import { ProductService } from 'src/app/shared/product.service';
import { ProuctListService } from 'src/app/shared/prouct-list.service';

@Component({
  selector: 'app-filtering-panel',
  templateUrl: './filtering-panel.component.html',
  styleUrl: './filtering-panel.component.scss'
})
export class FilteringPanelComponent {

  categorys: ProductCategoryModel[] = []
  checkedCategorys: ProductCategoryModel[] = []

  constructor(
    private productService: ProductService,
    private productListService: ProuctListService
  ) { }

  ngOnInit() {
    this.productService.getProductCategorys().subscribe(
      (categorys) => {
        this.categorys = categorys
      })
  }

  categoryChecked(event: any, category: ProductCategoryModel) {
    if (event.checked == true) {
      this.checkedCategorys.push(category)
    }
    else {
      this.checkedCategorys = this.checkedCategorys.filter(cat => cat.id !== category.id);
    }
    this.productService.filterProducts(this.checkedCategorys).subscribe(
      (res) => {
        this.productListService.clearProducts()
        this.productListService.addProduct(res)
      }
    )
  }
}
