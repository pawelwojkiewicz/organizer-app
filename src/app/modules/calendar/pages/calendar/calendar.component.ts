import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { Observable, EMPTY, forkJoin, merge } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { switchMap, concatMap, map, take, tap } from 'rxjs/operators';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import * as moment from 'moment';
import { Task } from 'src/app/shared/types/task.type';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  user$: Observable<User> = this.authService.user$;
  binding: string;
  today = this.calendarService.today;
  daysInCurrentMonth$ = this.calendarService.getDaysInCurrentMonth();
  tasks: {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private calendarService: CalendarService,
    private dataStorageService: DataStorageService
  ) { }



  ngOnInit(): void {
    this.authService.autoLogin();
    this.getCurrentMonthTasks();
    this.daysInCurrentMonth$.subscribe(el => console.log(el));
  }

  getCurrentMonthTasks(): void {
    this.dataStorageService.getCurrentMonthTasks()
      .pipe(
        tap(el => {
          this.tasks = el;
        }),
        switchMap(
          () => {
            return this.calendarService.currentDate$
              .pipe(
                tap(
                  (currentDate) => {
                    const newMonthTasks = this.getKeyByValue(this.tasks, currentDate);
                    this.calendarService.setNewMonthTasks(newMonthTasks);
                    console.log(newMonthTasks);

                  }
                )
              );
          }
        ),
      ).subscribe();
  }

  getKeyByValue(object, currentDate: moment.Moment) {
    return Object.keys(object).
      filter(key => key.includes(currentDate.format('MMMM-YYYY')))
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, []);
  }

  openCurrentDay(currentDay: moment.Moment): void {
    this.calendarService.onOpenDayDetails(true);
    this.calendarService.onOpenDate(currentDay);
  }

  logout(): void {
    this.authService.logout();
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully logged out!'
      }
    );
  }
}
