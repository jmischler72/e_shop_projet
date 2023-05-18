import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/products/Product';
import { delay, map, Observable, of, startWith, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequestState } from '../HttpRequestState';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = '/api/products';

  constructor(private http: HttpClient) {}

  applyHttpRequestState(
    observable: Observable<any>
  ): Observable<HttpRequestState<Product[]>> {
    return observable.pipe(
      map(value => ({ isLoading: false, value })),
      catchError(error => of({ isLoading: false, error })),
      startWith({ isLoading: true })
    );
  }

  getAllProducts(): Observable<HttpRequestState<Product[]>> {
    const products$: Observable<Product[]> = this.http
      .get<Product[]>(this.productsUrl)
      .pipe(
        delay(1000),
        map(products => {
          products.forEach(product => (product.quantity = 0));
          return products;
        })
      );
    return this.applyHttpRequestState(products$);
  }

  getFilteredProducts(
    data: Partial<{ byName: string | null; byCategory: string | null }>
  ): Observable<HttpRequestState<Product[]>> {
    const products$: Observable<Product[]> = this.http
      .post<Product[]>(this.productsUrl + '/filter', data)
      .pipe(
        map(products => {
          products.forEach(product => (product.quantity = 0));
          return products;
        })
      );
    return this.applyHttpRequestState(products$);
  }

  getProductById(productId: number) {
    return this.http.get<Product[]>(this.productsUrl + '/id' + productId);
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
