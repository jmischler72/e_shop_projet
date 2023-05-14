import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/users/user.service";
import {CartService} from "../../services/products/cart.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../models/users/User";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private authService: AuthService, private userService: UserService, private cartService: CartService) {
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUserInfo().subscribe(
        user => this.user$.next(user)
      );
    }
  }
}
