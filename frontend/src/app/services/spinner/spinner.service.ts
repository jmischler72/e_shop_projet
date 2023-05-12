import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SpinnerService {
  visibility: BehaviorSubject<boolean>;
  count = 0;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    this.visibility.next(true);
    this.count++;
  }

  hide() {
    this.count--;
    if (this.count === 0) {
      this.visibility.next(false);
    }
  }
}
