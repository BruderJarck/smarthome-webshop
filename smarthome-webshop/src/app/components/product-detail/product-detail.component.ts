import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ProductModel } from '../../models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('id') || ""
    this.productService.getProduct(name).subscribe(
      (res) => (this.product = res),
      (err) => console.log(err)
    );
  }

  onCollect() {
    this.sharedService.addProduct(this.product);
    this.sharedService.calcTotalAmmount();
  }
}
