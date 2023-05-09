import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../../../services/products/product.service";
import {Product} from "../../../models/products/Product";
import {map, Observable} from "rxjs";
import {CartItem} from "../../../models/products/CartItem";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  @Input() shoppingCart: CartItem[];
  @Output() productAdded = new EventEmitter<Product>();

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts()

  }

  loadProducts() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map((products) => {
          products.forEach((product) => {
            const index = this.shoppingCart.map(function(e) { return e.id; }).indexOf(product.id);
            if (index > -1) {
              product.quantity = this.shoppingCart[index].quantity;
            }
          })
          return products;
        })
      );
  }

  addToCart(product: Product) {
    this.productAdded.emit(product);
  }
}
