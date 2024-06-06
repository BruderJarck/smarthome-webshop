import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrderingTypeModel, ProductCategoryModel } from 'src/app/models';
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
  ordering_types: OrderingTypeModel[] = [
    {displayname: 'Name Aufsteigend', name: 'name'},
    {displayname: 'Name Absteigend', name: '-name'},
    {displayname: 'Preis Aufsteigend', name: 'price'},
    {displayname: 'Preis Absteigend', name: '-price'}
  ]
  selectedValue: string = ""

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

  orderingChanged(event:any){
    this.productService.orderProducts(this.selectedValue).subscribe(
      (res) => {
        this.productListService.clearProducts()
        this.productListService.addProduct(res)
      }
    )
  }
}
