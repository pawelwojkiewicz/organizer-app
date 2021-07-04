import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  moment = moment();
  private currentDate = new BehaviorSubject<moment.Moment>(this.moment);
  currentDate$ = this.currentDate.asObservable();

  constructor() { }

  onNextMonth(): void {
    this.currentDate.next(this.moment.add(1, 'M'));
  }

  onPrevMonth(): void {
    this.currentDate.next(this.moment.subtract(1, 'M'));
  }

  getCurrentDate(): Observable<string> {
    return this.currentDate$
      .pipe(
        map(el => el.format('MMMM YYYY'))
      );
  }
  getCurrentDaysInMonth(): Observable<number> {
    return this.currentDate$
      .pipe(
        map(el => el.daysInMonth())
      );
  }
  getCurrentDay(): Observable<string> {
    return this.currentDate$
      .pipe(
        map(el => el.format('D'))
      );
  }
}
