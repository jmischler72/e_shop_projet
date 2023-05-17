import { Injectable } from '@angular/core';
import { CartItem } from '../../models/products/CartItem';

const CART = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartItem[] = [];

  addToCart(addedProduct: CartItem) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  removeFromCart(product: CartItem) {
    const index = this.products.findIndex((x: CartItem) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  loadCart(): CartItem[] {
    this.products = JSON.parse(localStorage.getItem(CART) as any) || [];
    return this.products;
  }

  saveCart(): void {
    localStorage.setItem(CART, JSON.stringify(this.products));
  }
}
