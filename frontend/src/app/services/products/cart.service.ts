import { Injectable } from '@angular/core';
import {Product} from "../../models/products/Product";
import {CartItem} from "../../models/products/CartItem";

const CART = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: CartItem[] = [];
  constructor() {}

  getProduct() {
    return this.products;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart(): CartItem[] {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    return this.products;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }
}

