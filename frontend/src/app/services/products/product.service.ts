import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/products/Product";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "/api/products";


  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(res=> console.log(res)),
        map((products) => {
          products.forEach( product => product.quantity = 0);
          return products;
        }),

      )
  }


}
