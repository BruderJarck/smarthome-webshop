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
    {id: 1, displayname: 'Name Aufsteigend', name: 'name'},
    {id: 2, displayname: 'Name Absteigend', name: '-name'},
    {id: 3, displayname: 'Preis Aufsteigend', name: 'price'},
    {id: 4, displayname: 'Preis Absteigend', name: '-price'}
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
        this.productListService.addProduct(res.results)
      }
    )
  }

  orderingChanged(event:any){
    this.productService.orderProducts(this.selectedValue).subscribe(
      (res) => {
        this.productListService.clearProducts()
        this.productListService.addProduct(res.results)
      }
    )
  }
}
