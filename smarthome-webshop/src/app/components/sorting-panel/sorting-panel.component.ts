import { Component } from '@angular/core';
import { OrderingTypeModel } from 'src/app/models';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-sorting-panel',
  templateUrl: './sorting-panel.component.html',
  styleUrl: './sorting-panel.component.scss'
})
export class SortingPanelComponent {

  ordering_types: OrderingTypeModel[] = [
    { id: 1, displayname: 'Name Aufsteigend', name: 'name' },
    { id: 2, displayname: 'Name Absteigend', name: '-name' },
    { id: 3, displayname: 'Preis Aufsteigend', name: 'price' },
    { id: 4, displayname: 'Preis Absteigend', name: '-price' }
  ]
  selectedValue: string = "name"

  constructor(
    private productService: ProductService
  ) { }

  orderingChanged(event: any) {
    this.productService.orderProducts(this.selectedValue).subscribe()
  }
}
