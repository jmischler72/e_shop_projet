import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  quantityValue: number;
  @Output() quantityChange = new EventEmitter<number>();

  @Input()
  get quantity() {
    return this.quantityValue;
  }

  set quantity(value: number) {
    this.quantityValue = value;
    this.quantityChange.emit(this.quantityValue);
  }
}
