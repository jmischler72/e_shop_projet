import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  style({ opacity: 0, transform: 'translateX(-100%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateX(0%)' })
  ),
]);

const fromCenterToRight = animation([
  style({ opacity: 1, transform: 'translateX(0%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'translateX(100%)' })
  ),
]);

const fromCenterToLeft = animation([
  style({ opacity: 1, transform: 'translateX(0%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'translateX(-100%)' })
  ),
]);

const fromRightToCenter = animation([
  style({ opacity: 0, transform: 'translateX(100%)' }), // start state
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
      transition('slideRight => void', [
        useAnimation(fromCenterToRight, { params: { time: '500ms' } }),
      ]),
      transition('void => slideRight', [
        useAnimation(fromLeftToCenter, { params: { time: '500ms' } }),
      ]),
      transition('slideLeft => void', [
        useAnimation(fromCenterToLeft, { params: { time: '500ms' } }),
      ]),
      transition('void => slideLeft', [
        useAnimation(fromRightToCenter, { params: { time: '500ms' } }),
      ]),
      transition('void => appear', [
        style({ opacity: 0 }), // start state
        animate(200, style({ opacity: 1 })),
      ]),
      transition('appear => void', [
        style({ opacity: 1 }), // start state
        animate(200, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProductsCarouselComponent implements OnInit, OnDestroy {
  @Input() slides: SlideInterface[] = [];

  currentAnimation = 'slideRight';
  currentIndex = 0;
  private timeoutId?: number;

  private changeDetectorRef: ChangeDetectorRef;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

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
    this.currentAnimation = 'slideLeft';
    this.changeDetectorRef.detectChanges();

    const newIndex = this.mod(this.currentIndex - 1, this.slides.length);
    console.log(newIndex);

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    this.currentAnimation = 'slideRight';
    this.changeDetectorRef.detectChanges();

    const newIndex = this.mod(this.currentIndex + 1, this.slides.length);

    this.resetTimer();
    this.currentIndex = newIndex;
    console.log(this.currentIndex);
  }

  goToSlide(slideIndex: number): void {
    this.currentAnimation = 'appear';
    this.changeDetectorRef.detectChanges();

    this.resetTimer();
    this.currentIndex = slideIndex;
  }
}
