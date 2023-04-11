import {Component, Input} from '@angular/core';
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
            this.productOrders.push(new ProductOrder(product, 0));
          })
        },
        (error) => console.log(error)
      );
  }

  addToCart(order: ProductOrder) {

  }
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



}
