import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users/User';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/users/user.service';
import { CartService } from '../../../services/products/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  cartNumber: number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUserInfo().subscribe((user) => this.user$.next(user));
    }

    this.cartNumber = this.cartService.getCartItemNumber();
  }
}
