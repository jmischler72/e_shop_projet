import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/products/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "/api/products";


  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.productsUrl);
  }


}
