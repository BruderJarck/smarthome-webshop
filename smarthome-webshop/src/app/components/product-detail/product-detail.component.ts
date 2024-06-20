import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  @Input() product?: ProductModel
  description?: SafeHtml
  loading: boolean = true

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private productService: ProductService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('id') || ""
    this.productService.getProduct(name).subscribe(
      (res) => 
        {
          this.loading = false
          this.description = this.sanitizer.bypassSecurityTrustHtml(res.description)
          this.product = res
        }
    );
  }

  onCollect() {
    if(this.product){
      this.sharedService.addProduct(this.product);
      this.sharedService.calcTotalAmmount();
    }
    
  }
}
