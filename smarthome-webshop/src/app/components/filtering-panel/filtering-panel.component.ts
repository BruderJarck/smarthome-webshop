import { Component } from '@angular/core';
import { truncate } from 'fs';
import { ProductCategoryModel } from 'src/app/models';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-filtering-panel',
  templateUrl: './filtering-panel.component.html',
  styleUrl: './filtering-panel.component.scss'
})
export class FilteringPanelComponent {

  categories: ProductCategoryModel[] = []
  checkedCategorys: ProductCategoryModel[] = []
  loading: boolean = true

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {

    this.productService.getProductCategorys().subscribe(
      (categories) => {
        categories.forEach(element => {
          element.selected = false
        })
        this.categories = categories
        this.loading = false
      })

    this.productService.currentCategorysSource.subscribe((categories) => {
      console.log(categories)
      categories.forEach(element => {
        element.selected = true
        // this.categories[]
      });
      this.categories = categories
    })
  } 

  categoryChecked(event: any, category: ProductCategoryModel) {
    if (event.checked == true) {
      this.checkedCategorys.push(category)
    }
    else {
      this.checkedCategorys = this.checkedCategorys.filter(cat => cat.id !== category.id);
    }
    this.productService.filterProducts(this.checkedCategorys).subscribe()
    this.productService.currentCategorysSource.next(this.checkedCategorys)
  }

}
