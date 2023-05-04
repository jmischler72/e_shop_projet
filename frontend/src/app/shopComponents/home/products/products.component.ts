import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductOrder} from "../../../ProductOrder";
import {ProductService} from "../../../services/products/product.service";
import {Product} from "../../../models/products/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  @Input() filter = '';
  @Output() productOrder = new EventEmitter<ProductOrder>();

  shoppingCart: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts()
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0));
          })
        },
        (error) => console.log(error)
      );
  }

  addToCart(order: ProductOrder) {
    this.shoppingCart.push(order.product);
    this.productOrder.emit(order);
  }

  isInCart(order: ProductOrder) {
    if(this.shoppingCart.indexOf(order.product) === -1){
      return false;
    }else {
      return true;
    }

  }
}
