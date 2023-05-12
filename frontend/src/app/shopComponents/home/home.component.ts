import {Component, OnInit} from '@angular/core';
import {User} from "../../models/users/User";
import {UserService} from "../../services/users/user.service";
import {BehaviorSubject, delay} from "rxjs";
import {Product} from "../../models/products/Product";
import {CartService} from "../../services/products/cart.service";
import {CartItem} from "../../models/products/CartItem";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shoppingCart: CartItem[] = [];
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private authService: AuthService, private userService: UserService, private cartService: CartService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUserInfo().subscribe(
        user => this.user$.next(user)
      );
    }

    this.shoppingCart = this.cartService.loadCart();
  }

  addToCart(product: Product) {
    if (product.quantity) {
      this.cartService.addToCart(new CartItem(product.id, product.quantity));
    }
  }
}
