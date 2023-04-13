import {Component} from '@angular/core';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent {

  temp_filter = "";
  filter = "";


  applyFilter() {
    this.filter = this.temp_filter;
  }

  removeFilter() {
    this.filter = '';
    this.temp_filter = '';

  }


}
