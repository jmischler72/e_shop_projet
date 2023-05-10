import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ProductService} from "../../../services/products/product.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-searchbar-products',
  templateUrl: './searchbar-products.component.html',
  styleUrls: ['./searchbar-products.component.scss']
})
export class SearchbarProductsComponent {

  categoryForm = new FormControl('');
  filter = "";
  categories$: Observable<string[]>;

  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.loadCategories()

  }

  loadCategories(){
    this.categories$ = this.productService.getAllCategories();

  }
  removeFilter() {
    this.filter = '';
  }

}
