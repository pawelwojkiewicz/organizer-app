import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  moment = moment();
  daysInMonth = [];
  private currentDate = new BehaviorSubject<moment.Moment>(this.moment);
  private openDayDetails = new BehaviorSubject<boolean>(false);
  private openedDay = new Subject<string>();
  currentDate$ = this.currentDate.asObservable();
  openDayDetails$ = this.openDayDetails.asObservable();
  openedDay$ = this.openedDay.asObservable();

  constructor() { }

  get today(): moment.Moment {
    return moment();
  }

  onNextMonth(): void {
    this.currentDate.next(this.moment.add(1, 'M'));
  }

  onPrevMonth(): void {
    this.currentDate.next(this.moment.subtract(1, 'M'));
  }

  getDaysInCurrentMonth(): Observable<moment.Moment[]> {
    return this.currentDate$
      .pipe(
        map(el => {
          this.daysInMonth = [];
          for (let i = 0; i < el.daysInMonth(); i++) {
            this.daysInMonth.push(this.moment);
          }
          return this.daysInMonth;
        })
      );
  }
  onOpenDayDetails(value: boolean, day?: string): void {
    this.openDayDetails.next(value);
    this.openedDay.next(day);
  }
}


