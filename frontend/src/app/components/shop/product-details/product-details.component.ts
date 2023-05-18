import { Component } from '@angular/core';
import { finalize, map, Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../models/products/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  private routeSub: Subscription;
  product$: Observable<Product>;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']);
      // this.product$ = this.productService
      //   .getProductById(params['id'])
      //   .pipe(finalize(() => (this.isLoading = false)));
    });
  }
}
