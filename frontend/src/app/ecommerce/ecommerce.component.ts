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

  ngOnInit(){
    // @ts-ignore
    this.username = JSON.parse(localStorage.getItem('currentUser')).email;
    console.log(this.username);

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
}
