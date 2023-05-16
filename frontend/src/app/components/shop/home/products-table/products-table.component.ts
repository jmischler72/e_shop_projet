import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../../../../services/products/product.service";
import {Product} from "../../../../models/products/Product";
import {delay, finalize, map, Observable} from "rxjs";
import {CartItem} from "../../../../models/products/CartItem";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent{
  @Input() shoppingCart: CartItem[];
  @Output() productAdded = new EventEmitter<Product>();

  products$: Observable<Product[]>;
  isLoading: boolean;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.products$ = this.productService.getAllProducts()
      .pipe(
        delay(100000),
        map((products) => {
          products.forEach((product) => {
            const index = this.searchProductInShoppingCart(product);
            if (index > -1) {
              product.quantity = this.shoppingCart[index].quantity;
            }
          })
          return products;
        }),
        finalize(()=> this.isLoading = false)
      );
  }

  searchProductInShoppingCart(product : Product){
    return this.shoppingCart.map(function(e) { return e.id; }).indexOf(product.id);
  }

  addToCart(product: Product) {
    this.productAdded.emit(product);
  }
}