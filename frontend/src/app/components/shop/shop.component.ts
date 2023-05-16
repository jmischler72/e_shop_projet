import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/products/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.loadCart();
  }
}
