import { Component, Input } from '@angular/core';
import { ProductOrder } from '../../../../ProductOrder';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  @Input() shoppingCart: ProductOrder[];
  @Input() userId: number;

  constructor(private userService: UserService, private router: Router) {}

  deleteItem(order: ProductOrder) {
    console.log(this.shoppingCart);

    this.shoppingCart.splice(this.shoppingCart.indexOf(order), 1);
    console.log(this.shoppingCart);
  }

  onSubmit() {
    this.userService.addOrder(this.shoppingCart, this.userId).subscribe(
      (data) => {
        console.log(data);
        if (data != undefined) {
          this.router.navigate(['/']);
          this.shoppingCart = [];
        } else {
          console.log('order not sent');
        }
      },
      (error) => console.log(error)
    );
  }
}
