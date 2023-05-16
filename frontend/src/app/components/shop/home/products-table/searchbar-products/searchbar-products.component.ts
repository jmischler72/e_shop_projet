import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../../services/products/product.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searchbar-products',
  templateUrl: './searchbar-products.component.html',
  styleUrls: ['./searchbar-products.component.scss'],
})
export class SearchbarProductsComponent implements OnInit {
  productFilter = new FormGroup({
    byName: new FormControl(''),
    byCategory: new FormControl(''),
    age: new FormControl(''),
  });

  categories$: Observable<string[]>;
  dropDownOpen = false;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.productService.getAllCategories();
  }

  submitProductFilter() {
    console.log(this.productFilter);
  }
}
