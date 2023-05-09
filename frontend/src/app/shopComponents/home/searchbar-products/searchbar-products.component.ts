import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar-products',
  templateUrl: './searchbar-products.component.html',
  styleUrls: ['./searchbar-products.component.scss']
})
export class SearchbarProductsComponent {

  filter = "";

  removeFilter() {
    this.filter = '';
  }

}
