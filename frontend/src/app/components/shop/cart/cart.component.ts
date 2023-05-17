import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/products/cart.service';
import { ProductService } from '../../../services/products/product.service';
import { finalize, Observable } from 'rxjs';
import { Product } from '../../../models/products/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products$: Observable<Product[]>;
  isLoading: boolean;
  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    const productIds = this.cartService.products.map(product => product.id);
    this.isLoading = true;
    this.products$ = this.productService
      .getProductsByIds(productIds)
      .pipe(finalize(() => (this.isLoading = false)));
  }
}
