import { Component } from '@angular/core';
import { elementAt } from 'rxjs/operators';
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
    this.productService.currentCheckedCategorys.subscribe(checkedCategories => {
      this.checkedCategorys = checkedCategories
      this.productService.currentCategories.subscribe((categories) => {
        checkedCategories.forEach(checkedCategory => {
          checkedCategory.selected = true
          this.categories.forEach(category => {
            if (checkedCategory.name == category.name){
              category = checkedCategory
            }
          })
        })        
        this.categories = categories
        if(categories.length != 0){
          this.loading = false
        }
        if(this.checkedCategorys.length != 0){
          this.productService.filterProducts(this.checkedCategorys).subscribe()
        }
      })
    })

    if (this.categories.length == 0) {
      this.productService.getProductCategorys().subscribe(
        (categories) => {
          categories.forEach(element => {
            element.selected = false
          })
          this.productService.addCategories(categories)
          this.categories = categories
          this.loading = false
        })
    }
  }

  categoryChecked(event: any, category: ProductCategoryModel) {
    if (event.checked == true) {
      this.checkedCategorys.push(category)
    }
    else {
      this.checkedCategorys = this.checkedCategorys.filter(cat => cat.id !== category.id);
    }
    this.productService.filterProducts(this.checkedCategorys).subscribe()
    this.productService.updateCheckedCatregories(this.checkedCategorys)
  }

}
