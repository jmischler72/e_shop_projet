import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductOrder} from "./ecommerce/ProductOrder";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private productsUrl = "/api/products";
  private ordersUrl = "/api/orders";

  private productOrder: ProductOrder;
  private orders: ProductOrder[] = [];

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.productsUrl);
  }

  saveOrder(order: ProductOrder[]) {
    return this.http.post(this.ordersUrl, order);
  }

}
