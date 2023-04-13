import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductOrder} from "../../ProductOrder";
import {ProductService} from "../../product.service";
import {Product} from "../../Product";

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

  constructor(private ecommerceService: ProductService) {
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
  }

  loadProducts() {
    this.ecommerceService.getAllProducts()
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0, false));
          })
        },
        (error) => console.log(error)
      );
  }

  addToCart(order: ProductOrder) {
    order.in_cart = true;
    this.productOrder.emit(order);
  }

}
