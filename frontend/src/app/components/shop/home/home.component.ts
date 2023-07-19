import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { Product } from '../../../models/products/Product';
import { CartService } from '../../../services/products/cart.service';
import { CartItem } from '../../../models/products/CartItem';
import { AuthService } from '../../../services/auth/auth.service';
import { SlideInterface } from './products-carousel/slide.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoppingCart: CartItem[] = [];
  slides: SlideInterface[] = [
    { url: '/assets/image-1.jpeg', title: 'beach' },
    { url: '/assets/Sans titre.jpg', title: 'beach' },
    { url: '/assets/2.jpg', title: 'beach' },
    { url: '/assets/eshop_logo.png', title: 'beach' },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.shoppingCart = this.cartService.products;
  }

  addToCart(product: Product) {
    if (product.quantity) {
      this.cartService.addToCart(new CartItem(product.id, product.quantity));
    }
  }
}
