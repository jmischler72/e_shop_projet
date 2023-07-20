import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/products/cart.service';
import { ProductService } from '../../../services/products/product.service';
import { finalize, map, Observable, Subject, tap } from 'rxjs';
import { Product } from '../../../models/products/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products$: Observable<Product[]>;
  productsSubject$: Subject<Product[]> = new Subject<Product[]>();
  totalPrice = 0;
  isLoading: boolean;
  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    if (this.cartService.products.length > 0) {
      this.isLoading = true;

      this.products$ = this.productService
        .getProductsWithCartItem(this.cartService.products)
        .pipe(
          tap(products => {
            products.forEach(product => (this.totalPrice += product.price));
          })
        )
        .pipe(finalize(() => (this.isLoading = false)));
    }
  }

  removeProduct(product: Product) {
    this.cartService.removeFromCart(product.id);

    this.products$.pipe(
      map((products: Product[]) => {
        return products.filter(p => p.id !== product.id);
      })
    );
  }
}
