import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductOrder} from "../../../ProductOrder";
import {ProductService} from "../../../services/products/product.service";
import {Product} from "../../../models/products/Product";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  products$ : Observable<Product[]>;
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAllProducts();
  }

  // getDominantColor() {
  //   //draw the image to one pixel and let the browser find the dominant color
  //   const colorThief = new ColorThief();
  //   const img = document.querySelector('img');
  //
  //   // Make sure image is finished loading
  //   if (img.complete) {
  //     colorThief.getColor(img);
  //   } else {
  //     image.addEventListener('load', function() {
  //       colorThief.getColor(img);
  //     });
  //   }
  //
  // }

}
