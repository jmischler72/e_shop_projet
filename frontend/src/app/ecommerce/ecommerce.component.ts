import {Component} from '@angular/core';
import {ProductOrder} from "../ProductOrder";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent {

  filter = "";
  shoppingCart: ProductOrder[] = [];



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
