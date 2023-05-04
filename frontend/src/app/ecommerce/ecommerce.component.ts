import {Component, OnInit} from '@angular/core';
import {ProductOrder} from "../ProductOrder";
import {User} from "../User";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit{

  filter = "";
  shoppingCart: ProductOrder[] = [];
  username: string|undefined;
  userId: number;
  withCart: boolean;

  ngOnInit(){


    // this.username= JSON.parse(localStorage.getItem('currentUser')).username;
  }


  removeFilter() {
    this.filter = '';
  }


  addOrder($event: ProductOrder) {
    const order = this.shoppingCart.find(order => order.product == $event.product);
    if(order != undefined){
      order.quantity == $event.quantity;
    }else{
      this.shoppingCart.push($event);
    }
    console.log(this.shoppingCart)
  }

  showCart() {
    if(this.withCart){
      this.withCart = false;
    }else {
      this.withCart = true;
    }
  }
}
