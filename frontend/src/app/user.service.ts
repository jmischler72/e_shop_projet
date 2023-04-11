import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Product} from "./Product";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private productsUrl = "/api/user";


  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    // return this.http.get<Product[]>(this.productsUrl+"/get-all");
    return this.http.get<Product[]>(this.productsUrl);
  }


}
