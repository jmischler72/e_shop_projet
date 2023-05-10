import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../models/products/Product";
import {ProductService} from "../../../services/products/product.service";

@Component({
  selector: 'app-carousel-products',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.products$ = this.productService.getAllProducts();

  }

  protected readonly length = length;
}
