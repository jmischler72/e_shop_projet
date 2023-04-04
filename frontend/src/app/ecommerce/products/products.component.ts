import { Component } from '@angular/core';
import {ProductOrder} from "../../ProductOrder";
import {EcommerceService} from "../../ecommerce.service";
import {Product} from "../../Product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder | null;
  productSelected: boolean = false;

  constructor(private ecommerceService: EcommerceService) {
    this.selectedProductOrder = null;
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    // this.loadOrders();
  }

  loadProducts() {
    this.ecommerceService.getAllProducts()
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

  // loadOrders() {
  //   this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
  //     this.shoppingCartOrders = this.ecommerceService.;
  //   });
  // }

  // addToCart(order: ProductOrder) {
  //   this.selectedProductOrder = order;
  //   this.productSelected = true;
  // }
  //
  // removeFromCart(productOrder: ProductOrder) {
  //
  //   let index = this.getProductIndex(productOrder.product);
  //   if (index > -1) {
  //     this.shoppingCartOrders.productOrders.splice(
  //       this.getProductIndex(productOrder.product), 1);
  //   }
  //   this.ecommerceService.ProductOrders = this.shoppingCartOrders;
  //   this.shoppingCartOrders = this.ecommerceService.ProductOrders;
  //   this.productSelected = false;
  // }

  isProductSelected(product: Product){
    if(product === this.selectedProductOrder?.product){
      return true;
    }
    return false;
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    // this.ecommerceService.ProductOrders.productOrders = [];
    // this.loadOrders();
    this.productSelected = false;
  }

}
