import {Component, OnInit} from '@angular/core';
import {ProductOrder} from "../../ProductOrder";
import {User} from "../../models/users/User";
import {StorageService} from "../../services/auth/storage.service";
import {UserService} from "../../services/users/user.service";
import {BehaviorSubject, delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filter = "";
  shoppingCart: ProductOrder[] = [];
  username: string | undefined;
  userId: number;
  withCart: boolean;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private storageService: StorageService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      user => this.user$.next(user)
    );
  }


  addOrder($event: ProductOrder) {
    const order = this.shoppingCart.find(order => order.product == $event.product);
    if (order != undefined) {
      order.quantity == $event.quantity;
    } else {
      this.shoppingCart.push($event);
    }
    console.log(this.shoppingCart)
  }
}
