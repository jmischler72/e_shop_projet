import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  });

  @Output() filters: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  categories$: Observable<string[]>;
  dropDownOpen = false;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.loadCategories();
  }

  get byName() {
    return this.productFilter.get('byName');
  }

  get byCategory() {
    return this.productFilter.get('byCategory');
  }

  loadCategories() {
    this.categories$ = this.productService.getAllCategories();
  }

  submitProductFilter() {
    if (this.productFilter.valid) {
      Object.keys(this.productFilter.controls).forEach(key => {
        if (this.productFilter.get(key)?.value === '') {
          this.productFilter.get(key)?.patchValue(null);
        }
      });
      this.filters.emit(this.productFilter);
    }
  }
}
