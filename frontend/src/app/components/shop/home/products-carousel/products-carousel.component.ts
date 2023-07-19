import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideInterface } from './slide.interface';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const fromLeftToCenter = animation([
  style({ transform: 'translateX(-100%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ transform: 'translateX(0%)' })
  ),
]);

const fromCenterToRight = animation([
  style({ transform: 'translateX(0%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateX(100%)' })
  ),
]);

const fromCenterToLeft = animation([
  style({ transform: 'translateX(0%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateX(-100%)' })
  ),
]);

const fromRightToCenter = animation([
  style({ transform: 'translateX(100%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateX(0%)' })
  ),
]);

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition('slide => void', [
        useAnimation(fromCenterToLeft, { params: { time: '500ms' } }),
      ]),
      transition('void => slide', [
        useAnimation(fromLeftToCenter, { params: { time: '500ms' } }),
      ]),
    ]),
  ],
})
export class ProductsCarouselComponent implements OnInit, OnDestroy {
  @Input() slides: SlideInterface[] = [];

  currentIndex = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 6000);
  }

  mod(a: number, n: number) {
    return a - n * Math.floor(a / n);
  }
  goToPrevious(): void {
    const newIndex = this.mod(this.currentIndex - 1, this.slides.length);
    console.log(newIndex);

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const newIndex = this.mod(this.currentIndex + 1, this.slides.length);

    this.resetTimer();
    this.currentIndex = newIndex;
    console.log(this.currentIndex);
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }
}
