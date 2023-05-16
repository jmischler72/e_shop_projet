import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/products/Product';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(res => console.log(res)),
      map(products => {
        products.forEach(product => (product.quantity = 0));
        return products;
      })
    );
  }

  getProductFromId(id: number) {
    return this.http
      .get<Product>(this.productsUrl + '/id/' + id)
      .pipe(tap(res => console.log(res)));
  }

  getProductsByIds(productIds: number[]) {
    const url = `${this.productsUrl + '/ids'}?ids=${productIds.join(',')}`;
    return this.http.get<Product[]>(url);
  }

  getAllCategories() {
    return this.http
      .get<string[]>(this.productsUrl + '/categories')
      .pipe(tap(res => console.log(res)));
  }
}
