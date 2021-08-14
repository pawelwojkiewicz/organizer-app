import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/shared/types/task.type';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  daysInMonth = [];
  private currentDate = new BehaviorSubject<moment.Moment>(moment());
  private openDayDetails = new BehaviorSubject<boolean>(false);
  private openedDate = new ReplaySubject<moment.Moment>(1);
  private newMonthTasks = new Subject<{}>();
  currentDate$ = this.currentDate.asObservable();
  openDayDetails$ = this.openDayDetails.asObservable();
  openedDate$ = this.openedDate.asObservable();
  newMonthtasks$ = this.newMonthTasks.asObservable();

  constructor() { }

  get today(): moment.Moment {
    return moment();
  }

  onNextMonth(): void {
    this.currentDate.next(this.currentDate.value.add(1, 'M'));
  }

  onPrevMonth(): void {
    this.currentDate.next(this.currentDate.value.subtract(1, 'M'));
  }

  setNewMonthTasks(task: {}): void {
    this.newMonthTasks.next(task);
  }

  getDaysInCurrentMonth(): Observable<moment.Moment[]> {
    return this.currentDate$
      .pipe(
        map(el => {
          this.daysInMonth = [];
          for (let i = 0; i < el.daysInMonth(); i++) {
            this.daysInMonth.push(this.currentDate.value.clone().date(i + 1));
          }
          return this.daysInMonth;
        })
      );
  }

  onOpenDayDetails(value: boolean): void {
    this.openDayDetails.next(value);
  }

  onOpenDate(day: moment.Moment): void {
    this.openedDate.next(day);
  }
}


