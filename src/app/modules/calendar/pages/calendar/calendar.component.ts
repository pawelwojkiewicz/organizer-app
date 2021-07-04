import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { Observable, EMPTY } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  user$: Observable<User> = this.authService.user$;
  tasks$: Observable<any>;
  binding: string;
  moment = moment();
  markCurrentDay = true;
  currentDate = this.moment.format('MMMM YYYY');
  daysInMonth: number[];
  currentNumberOfMonth = +this.moment.format('D');

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.tasks$ = this.user$.pipe(
      switchMap(
        (user: User) => {
          if (!user) {
            return EMPTY;
          }
          return this.dataStorageService.getTasks(user);
        }
      ),
      untilDestroyed(this)
    );
    this.setDaysInMonth(moment().daysInMonth());
  }

  setDaysInMonth(days: number): void {
    this.daysInMonth = [];
    for (let i = 0; i < days; i++) {
      this.daysInMonth.push(i + 1);
    }
  }

  getNewMonth(newMoment: moment.Moment): void {
    const daysInNewMonth = newMoment.daysInMonth();
    const newDate = newMoment.format('MMMM YYYY');
    this.setDaysInMonth(daysInNewMonth);
    if (newDate !== this.currentDate) {
      this.markCurrentDay = false;
      return;
    }
    this.markCurrentDay = true;
  }

  addTask(user: User): void {
    this.dataStorageService
      .addTask(user, this.binding)
      .pipe(untilDestroyed(this))
      .subscribe();
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
