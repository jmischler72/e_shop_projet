import { Injectable } from '@angular/core';
import { CartItem } from '../../models/products/CartItem';

const CART = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartItem[] = [];

  addToCart(addedProduct: CartItem) {
    const index = this.products.findIndex(
      (x: CartItem) => x.id === addedProduct.id
    );

    if (index != -1) {
      this.products[index].quantity = addedProduct.quantity;
    } else {
      this.products.push(addedProduct);
    }

    this.saveCartToLocalStorage();
  }

  removeFromCart(product_id: number) {
    const index = this.products.findIndex((x: CartItem) => x.id === product_id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }

  loadCartFromLocalStorage(): CartItem[] {
    this.products = JSON.parse(localStorage.getItem(CART) as any) || [];
    return this.products;
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem(CART, JSON.stringify(this.products));
  }
}
