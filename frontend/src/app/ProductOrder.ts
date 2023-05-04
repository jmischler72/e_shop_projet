import {Product} from "./models/products/Product";

export class ProductOrder {
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
  product: Product;
  quantity: number;

  // all arguments constructor
}
