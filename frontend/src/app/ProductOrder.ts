import {Product} from "./Product";

export class ProductOrder {
  constructor(product: Product, quantity: number, in_cart: boolean) {
    this.product = product;
    this.quantity = quantity;
    this.in_cart = in_cart;
  }
  product: Product;
  quantity: number;
  in_cart: boolean;

  // all arguments constructor
}
