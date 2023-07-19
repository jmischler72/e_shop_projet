import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideInterface } from './slide.interface';
import {
  animate,
  animation,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const scaleIn = animation([
  style({ opacity: 0, transform: 'translateX(0%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateX(100%)' })
  ),
]);

const scaleOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'translateX(0%)' })
  ),
]);

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } }),
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } }),
      ]),
      transition(':decrement', left),
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

  goToPrevious(): void {
    const newIndex = (this.currentIndex - 1) % this.slides.length;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const newIndex = (this.currentIndex + 1) % this.slides.length;

    this.resetTimer();
    this.currentIndex = newIndex;
    console.log(this.currentIndex);
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }
}
