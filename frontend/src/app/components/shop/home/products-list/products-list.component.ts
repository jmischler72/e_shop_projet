import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/products/product.service';
import { Product } from '../../../../models/products/Product';
import { delay, finalize, map, Observable } from 'rxjs';
import { CartItem } from '../../../../models/products/CartItem';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { HttpRequestState } from '../../../../services/HttpRequestState';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() shoppingCart: CartItem[];
  @Output() productAdded = new EventEmitter<Product>();

  products$: Observable<HttpRequestState<Product[]>>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(products => {
        if (products.value) {
          products.value.forEach(product => {
            const index = this.searchProductInShoppingCart(product);
            if (index > -1) {
              product.quantity = this.shoppingCart[index].quantity;
            }
          });
        }
        return products;
      })
    );
  }

  filterProducts(filters: FormGroup) {
    this.products$ = this.productService
      .getFilteredProducts(filters.value)
      .pipe(
        map(products => {
          if (products.value)
            products.value.forEach(product => {
              const index = this.searchProductInShoppingCart(product);
              if (index > -1) {
                product.quantity = this.shoppingCart[index].quantity;
              }
            });
          return products;
        })
      );
  }

  searchProductInShoppingCart(product: Product) {
    return this.shoppingCart
      .map(function (e) {
        return e.id;
      })
      .indexOf(product.id);
  }
}
