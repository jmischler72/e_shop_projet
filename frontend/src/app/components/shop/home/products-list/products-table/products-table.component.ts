import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../../models/products/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Product[];
  @Output() productAdded = new EventEmitter<Product>();
}
